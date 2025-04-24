import { pgTable, text, serial, integer, boolean, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  avatarUrl: text("avatar_url"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
  avatarUrl: true,
});

// Customer schema
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomerSchema = createInsertSchema(customers).pick({
  name: true,
  email: true,
  phone: true,
  address: true,
  avatarUrl: true,
});

// Supplier schema
export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  contactPerson: text("contact_person"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSupplierSchema = createInsertSchema(suppliers).pick({
  name: true,
  email: true,
  phone: true,
  address: true,
  contactPerson: true,
});

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price").notNull(),
  stock: integer("stock").notNull().default(0),
  imageUrl: text("image_url"),
  category: text("category"),
  supplierId: integer("supplier_id").references(() => suppliers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  stock: true,
  imageUrl: true,
  category: true,
  supplierId: true,
});

// Sale/Invoice schema
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  total: numeric("total").notNull(),
  status: text("status").notNull().default("pending"),
  date: timestamp("date").defaultNow().notNull(),
  dueDate: timestamp("due_date"),
  notes: text("notes"),
});

export const insertInvoiceSchema = createInsertSchema(invoices).pick({
  invoiceNumber: true,
  customerId: true,
  total: true,
  status: true,
  date: true,
  dueDate: true,
  notes: true,
});

// Invoice items schema
export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price").notNull(),
  subtotal: numeric("subtotal").notNull(),
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems).pick({
  invoiceId: true,
  productId: true,
  quantity: true,
  unitPrice: true,
  subtotal: true,
});

// Activity schema
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // sale, customer, product, invoice
  action: text("action").notNull(), // create, update, delete
  description: text("description").notNull(),
  metadata: jsonb("metadata"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  action: true,
  description: true,
  metadata: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

// Dashboard statistics type
export type DashboardStats = {
  totalSales: number;
  salesGrowth: number;
  customerCount: number;
  customerGrowth: number;
  productCount: number;
  productGrowth: number;
  profitMargin: number;
  profitMarginGrowth: number;
};

// Dashboard chart data type
export type SalesChartData = {
  date: string;
  revenue: number;
  profit: number;
}[];

// Top products type
export type TopProduct = {
  id: number;
  name: string;
  price: number;
  unitsSold: number;
  growth: number;
  percentage: number;
  icon: string;
};
