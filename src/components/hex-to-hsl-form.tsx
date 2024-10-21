import isHexColor from "validator/lib/isHexColor";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
    hex: z.string().refine(isHexColor, { message: "Invalid HEX color." }),
});

export function HEXToHSLForm() {
    // TO-DO: Functionality and display converted values
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            hex: "",
        },
    });

    const handleSubmit = form.handleSubmit((values) => {
        console.log(values);
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="hex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>HEX color</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter HEX color"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-4">
                    <Button type="submit">Convert</Button>
                </div>
            </form>
        </Form>
    );
}
