import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface MetricCounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
  prefix?: string
}

export function MetricCounter({ end, duration = 1500, suffix = "", prefix = "", className }: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    const startValue = countRef.current
    const diff = end - startValue

    if (diff === 0) return

    let startTimestamp: number
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const newCount = Math.floor(startValue + diff * easeOutQuart)

      setCount(newCount)
      countRef.current = newCount

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        // Ensure final count is exact
        setCount(end)
        countRef.current = end
      }
    }

    requestAnimationFrame(step)
  }, [end, duration])

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  }

  return (
    <span className={cn("font-bold tabular-nums", className)}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}