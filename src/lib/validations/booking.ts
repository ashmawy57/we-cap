import * as z from "zod"

export const bookingSchema = z.object({
    fullName: z.string().min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    countryCode: z.string().min(1),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
