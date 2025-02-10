import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center p-2 border rounded-md"
        >
            {theme === "dark" ? (
                <Sun className="h-[1rem] w-[1rem]" />
            ) : (
                <Moon className="h-[1rem] w-[1rem]" />
            )}
        </button>
    )
}
