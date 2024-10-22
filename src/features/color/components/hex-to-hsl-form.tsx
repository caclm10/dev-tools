import { useState } from "react";
import isHexColor from "validator/lib/isHexColor";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon } from "lucide-react";

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
import { hexToHSL } from "@/features/color/utils";
import {
    ColorConverResult,
    ColorConvertResultItem,
} from "@/features/color/components/color-convert-result";

const schema = z.object({
    hex: z.string().refine(isHexColor, { message: "Invalid HEX color." }),
});

interface Result {
    hex: string;
    h: number;
    s: number;
    l: number;
}

export function HexToHSLForm() {
    const [result, setResult] = useState<Result | null>(null);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            hex: "",
        },
    });

    const handleSubmit = form.handleSubmit((values) => {
        const hex =
            values.hex.charAt(0) === "#" ? values.hex : `#${values.hex}`;

        const { h, s, l } = hexToHSL(hex);
        setResult({ hex, h, s, l });
    });

    return (
        <>
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

            {result && (
                <ColorConverResult>
                    <ColorConvertResultItem label="Hex" value={result.hex} />

                    <ColorConvertResultItem
                        label="HSL"
                        value={`hsl(${result.h}, ${result.s}%, ${result.l}%)`}
                    />

                    <ColorConvertResultItem
                        label="HSL"
                        value={`hsl(${result.h} ${result.s}% ${result.l}%)`}
                    />

                    <ColorConvertResultItem
                        label="HSL Number"
                        value={`${result.h}, ${result.s}%, ${result.l}%`}
                    />

                    <ColorConvertResultItem
                        label="HSL Number"
                        value={`${result.h} ${result.s}% ${result.l}%`}
                    />
                </ColorConverResult>
            )}
        </>
    );
}
