import React from 'react'
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
} from '../components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../components/ui/input.jsx'
import { Button } from '../components/ui/button.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { axiosInstance } from '../utils/axios.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Zod schema
const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    company: z.string().min(1, 'Company is required'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
})

const Contact = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            subject: '',
            message: '',
        },
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (data) => {
        try {
            await axiosInstance.post('/mail/send', data)

            toast.success(
                "Thanks for reaching out — I’ll get back to you shortly.",
                { position: 'top-center' }
            )

            form.reset()
        } catch (error) {
            console.error('Error in sending email', error)
            toast.error('Failed to send message. Please try again.', {
                position: 'top-center',
            })
        }
    }

    return (
        <div className="h-full w-full p-6 flex items-center justify-center flex-col gap-10">
            <h4 className="text-4xl font-bold text-center">Contact Me</h4>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4 w-full lg:w-2/3"
                >
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Your name" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.name && (
                        <p className="text-red-600 text-sm">
                            {form.formState.errors.name.message}
                        </p>
                    )}

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="your@email.com" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-600 text-sm">
                            {form.formState.errors.email.message}
                        </p>
                    )}

                    {/* Company */}
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Company name" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.company && (
                        <p className="text-red-600 text-sm">
                            {form.formState.errors.company.message}
                        </p>
                    )}

                    {/* Subject */}
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Subject" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.subject && (
                        <p className="text-red-600 text-sm">
                            {form.formState.errors.subject.message}
                        </p>
                    )}

                    {/* Message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Your message..." />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.message && (
                        <p className="text-red-600 text-sm">
                            {form.formState.errors.message.message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="
              mt-4
              cursor-pointer
              transition-transform duration-150
              active:scale-95
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Contact
