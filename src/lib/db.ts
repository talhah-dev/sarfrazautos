import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as productsSchema from "@/db/schema/products"
import * as ordersSchema from "@/db/schema/orders"
import * as messagesSchema from "@/db/schema/messages"
import * as authSchema from "@/db/schema/auth"
import * as schemesSchema from "@/db/schema/schemes"

const schema = { ...productsSchema, ...ordersSchema, ...messagesSchema, ...authSchema, ...schemesSchema }

export const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
export default db
