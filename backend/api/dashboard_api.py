"""
API para el dashboard.
"""

from datetime import datetime, timedelta
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func, desc
from models import Customer, Product, Invoice, InvoiceItem
from models.base import db
from utils.errors import DatabaseError

# Crear namespace
ns = Namespace('dashboard', description='Operaciones del dashboard')

# Rutas del API
@ns.route('/stats')
class DashboardStats(Resource):
    """Endpoints para estadísticas generales del dashboard."""
    
    @ns.doc('get_dashboard_stats')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener estadísticas generales para el dashboard."""
        try:
            # Contar total de clientes
            total_customers = Customer.query.count()
            
            # Contar total de productos
            total_products = Product.query.count()
            
            # Contar total de facturas
            total_invoices = Invoice.query.count()
            
            # Calcular ventas totales
            total_sales = db.session.query(func.sum(Invoice.total)).scalar() or 0
            
            # Calcular ventas del mes actual
            first_day_of_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            monthly_sales = db.session.query(func.sum(Invoice.total)).filter(
                Invoice.date >= first_day_of_month
            ).scalar() or 0
            
            # Obtener facturas pendientes
            pending_invoices = Invoice.query.filter_by(status='pending').count()
            
            # Calcular valor promedio de facturas
            avg_invoice_value = db.session.query(func.avg(Invoice.total)).scalar() or 0
            
            # Contar productos con bajo stock (menos de 10 unidades)
            low_stock_products = Product.query.filter(Product.stock < 10).count()
            
            return {
                'success': True,
                'data': {
                    'total_customers': total_customers,
                    'total_products': total_products,
                    'total_invoices': total_invoices,
                    'total_sales': float(total_sales),
                    'monthly_sales': float(monthly_sales),
                    'pending_invoices': pending_invoices,
                    'avg_invoice_value': float(avg_invoice_value),
                    'low_stock_products': low_stock_products
                }
            }, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/sales-chart')
class SalesChart(Resource):
    """Endpoint para datos de gráfico de ventas."""
    
    @ns.doc('get_sales_chart')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener datos para gráfico de ventas de los últimos 6 meses."""
        try:
            # Calcular fecha de inicio (6 meses atrás)
            today = datetime.utcnow()
            start_date = (today.replace(day=1) - timedelta(days=1)).replace(day=1)
            
            # Inicializar array de resultados
            months = []
            sales_data = []
            
            # Obtener datos de ventas por mes de los últimos 6 meses
            for i in range(6):
                month_start = today.replace(day=1) - timedelta(days=30 * i)
                month_end = (month_start.replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)
                month_name = month_start.strftime('%B')
                
                # Calcular ventas del mes
                month_sales = db.session.query(func.sum(Invoice.total)).filter(
                    Invoice.date.between(month_start, month_end)
                ).scalar() or 0
                
                months.insert(0, month_name)
                sales_data.insert(0, float(month_sales))
            
            return {
                'success': True,
                'data': {
                    'labels': months,
                    'datasets': [
                        {
                            'label': 'Ventas',
                            'data': sales_data
                        }
                    ]
                }
            }, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/top-products')
class TopProducts(Resource):
    """Endpoint para productos más vendidos."""
    
    @ns.doc('get_top_products')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener los 5 productos más vendidos."""
        try:
            # Consultar productos más vendidos por cantidad
            top_products = db.session.query(
                Product.id,
                Product.name,
                func.sum(InvoiceItem.quantity).label('total_sold'),
                func.sum(InvoiceItem.quantity * InvoiceItem.price).label('total_revenue')
            ).join(
                InvoiceItem, InvoiceItem.product_id == Product.id
            ).group_by(
                Product.id
            ).order_by(
                desc('total_sold')
            ).limit(5).all()
            
            # Formatear resultados
            result = [
                {
                    'id': p.id,
                    'name': p.name,
                    'total_sold': int(p.total_sold),
                    'total_revenue': float(p.total_revenue)
                } for p in top_products
            ]
            
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/recent-invoices')
class RecentInvoices(Resource):
    """Endpoint para facturas recientes."""
    
    @ns.doc('get_recent_invoices')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener las 5 facturas más recientes."""
        try:
            # Consultar facturas recientes
            recent_invoices = Invoice.query.order_by(
                desc(Invoice.date)
            ).limit(5).all()
            
            # Formatear resultados
            result = []
            for invoice in recent_invoices:
                customer_name = invoice.customer.name if invoice.customer else 'N/A'
                result.append({
                    'id': invoice.id,
                    'invoice_number': invoice.invoice_number,
                    'date': invoice.date.isoformat() if invoice.date else None,
                    'customer_name': customer_name,
                    'total': invoice.total,
                    'status': invoice.status
                })
            
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/activities')
class RecentActivities(Resource):
    """Endpoint para actividades recientes."""
    
    @ns.doc('get_activities')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener actividades recientes (nuevos clientes, facturas, etc.)."""
        try:
            # Obtener clientes recientes
            recent_customers = Customer.query.order_by(
                desc(Customer.created_at)
            ).limit(3).all()
            
            # Obtener facturas recientes
            recent_invoices = Invoice.query.order_by(
                desc(Invoice.created_at)
            ).limit(3).all()
            
            # Combinar y ordenar actividades
            activities = []
            
            for customer in recent_customers:
                activities.append({
                    'type': 'customer',
                    'id': customer.id,
                    'name': customer.name,
                    'date': customer.created_at.isoformat(),
                    'description': f"Nuevo cliente: {customer.name}"
                })
            
            for invoice in recent_invoices:
                customer_name = invoice.customer.name if invoice.customer else 'N/A'
                activities.append({
                    'type': 'invoice',
                    'id': invoice.id,
                    'name': invoice.invoice_number,
                    'date': invoice.created_at.isoformat(),
                    'description': f"Nueva factura: {invoice.invoice_number} para {customer_name}"
                })
            
            # Ordenar por fecha (más reciente primero)
            activities.sort(key=lambda x: x['date'], reverse=True)
            
            # Limitar a 10 actividades
            activities = activities[:10]
            
            return {'success': True, 'data': activities}, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/sales-summary')
class SalesSummary(Resource):
    """Endpoint para resumen de ventas."""
    
    @ns.doc('get_sales_summary')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener resumen de ventas."""
        try:
            # Calcular ventas totales
            total_sales = db.session.query(func.sum(Invoice.total)).scalar() or 0
            
            # Calcular número total de ventas
            total_orders = Invoice.query.count()
            
            # Calcular valor promedio de ventas
            avg_order_value = total_sales / total_orders if total_orders > 0 else 0
            
            # Calcular número de facturas pagadas vs pendientes
            paid_invoices = Invoice.query.filter_by(status='paid').count()
            pending_invoices = Invoice.query.filter_by(status='pending').count()
            
            return {
                'success': True,
                'data': {
                    'total_sales': float(total_sales),
                    'total_orders': total_orders,
                    'average_order_value': float(avg_order_value),
                    'paid_invoices': paid_invoices,
                    'pending_invoices': pending_invoices
                }
            }, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/sales-by-period')
class SalesByPeriod(Resource):
    """Endpoint para ventas por período."""
    
    @ns.doc('get_sales_by_period')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener ventas agrupadas por día, semana o mes."""
        try:
            period = request.args.get('period', 'day')
            valid_periods = ['day', 'week', 'month']
            
            if period not in valid_periods:
                period = 'day'  # Default a día si el período no es válido
            
            # Obtener datos según el período
            if period == 'day':
                # Ventas de los últimos 7 días
                start_date = datetime.utcnow() - timedelta(days=7)
                result = []
                
                for i in range(7):
                    day = start_date + timedelta(days=i)
                    day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
                    day_end = day.replace(hour=23, minute=59, second=59, microsecond=999999)
                    
                    day_sales = db.session.query(func.sum(Invoice.total)).filter(
                        Invoice.date.between(day_start, day_end)
                    ).scalar() or 0
                    
                    result.append({
                        'label': day.strftime('%Y-%m-%d'),
                        'value': float(day_sales)
                    })
                
            elif period == 'week':
                # Ventas de las últimas 4 semanas
                start_date = datetime.utcnow() - timedelta(weeks=4)
                result = []
                
                for i in range(4):
                    week_start = start_date + timedelta(weeks=i)
                    week_end = week_start + timedelta(days=6)
                    
                    week_sales = db.session.query(func.sum(Invoice.total)).filter(
                        Invoice.date.between(week_start, week_end)
                    ).scalar() or 0
                    
                    result.append({
                        'label': f"Semana {i+1}",
                        'value': float(week_sales)
                    })
                
            else:  # month
                # Ventas de los últimos 6 meses
                result = []
                today = datetime.utcnow()
                
                for i in range(6):
                    month_start = (today.replace(day=1) - timedelta(days=30*i)).replace(day=1)
                    if i < 5:
                        month_end = (month_start.replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)
                    else:
                        month_end = today
                    
                    month_sales = db.session.query(func.sum(Invoice.total)).filter(
                        Invoice.date.between(month_start, month_end)
                    ).scalar() or 0
                    
                    result.append({
                        'label': month_start.strftime('%B %Y'),
                        'value': float(month_sales)
                    })
                
                # Invertir para que estén en orden cronológico
                result.reverse()
            
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/customer-statistics')
class CustomerStatistics(Resource):
    """Endpoint para estadísticas de clientes."""
    
    @ns.doc('get_customer_statistics')
    @ns.response(200, 'Éxito')
    def get(self):
        """Obtener estadísticas de clientes."""
        try:
            # Total de clientes
            total_customers = Customer.query.count()
            
            # Clientes nuevos del último mes
            month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            new_customers = Customer.query.filter(
                Customer.created_at >= month_start
            ).count()
            
            # Clientes con al menos una compra
            customers_with_purchases = db.session.query(
                func.count(func.distinct(Invoice.customer_id))
            ).scalar() or 0
            
            # Clientes sin compras
            customers_without_purchases = total_customers - customers_with_purchases
            
            return {
                'success': True,
                'data': {
                    'total_customers': total_customers,
                    'new_customers': new_customers,
                    'repeat_customers': customers_with_purchases,
                    'inactive_customers': customers_without_purchases
                }
            }, 200
        except Exception as e:
            raise DatabaseError(str(e)) 