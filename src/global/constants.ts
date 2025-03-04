export const API_DASHBOARD_GET = "https://dashboard-api-dusky.vercel.app/api/get"
export const API_TOKEN = process.env.API_TOKEN

export const LOCAL_THEME_MODE = "theme-mode"

export const THEME_MODES = ["light"] as const
export const THEME_COLORS = ["zinc", "slate", "red",  "rose", "orange", "green",  "blue", "violet"] as const