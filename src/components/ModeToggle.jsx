import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"

export function ModeToggle({ onClose }) {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        onClose()
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
