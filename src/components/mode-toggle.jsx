import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch" // Assuming you're using a Switch component

import { useTheme } from "@/context/theme-context"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const handleToggleChange = (checked) => {
        if (checked) {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Sun
                className={`h-[1.2rem] w-[1.2rem] ${theme === "dark" ? "text-gray-400" : "text-yellow-500"}`}
            />
            <Switch
                checked={theme === "dark"}
                onCheckedChange={handleToggleChange}
                className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded-full relative"
            >
                <span className="sr-only">Toggle theme</span>
                <span
                    className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-full transition-transform ${
                        theme === "dark" ? "transform translate-x-full" : ""
                    }`}
                />
            </Switch>
            <Moon
                className={`h-[1.2rem] w-[1.2rem] ${theme === "light" ? "text-gray-400" : "text-blue-500"}`}
            />
        </div>
    )
}
