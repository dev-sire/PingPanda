import { z } from "zod";

export const CATEGORY_NAME_VALIDATOR = z
    .string()
    .min(1, "Category name is requred")
    .regex(
        /^[a-zA-Z0-9-]+$/, 
        "Category names can only contain letters, numbers or hyphens."
    )
