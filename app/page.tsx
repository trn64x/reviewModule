'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { VerifiedIcon } from "lucide-react"
import { Rating } from "@/components/rating"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Opinia = {
  name: string
  avatar: string
  opinia: string
  gwiazdki: number
  verified: boolean
}

const initialOpinie: Opinia[] = [
  {
    name: "Mike Gaearon",
    avatar: "https://github.com/gaearon.png",
    opinia: "Świetna jakość usług, wszystko zostało zrealizowane bardzo profesjonalnie.",
    gwiazdki: 5,
    verified: true,
  },
  {
    name: "Linus Torvalds",
    avatar: "https://github.com/torvalds.png",
    opinia: "Średnie doświadczenie, kilka rzeczy wymaga poprawy.",
    gwiazdki: 2,
    verified: false,
  },
  {
    name: "sindresorhus",
    avatar: "https://github.com/sindresorhus.png",
    opinia: "Produkt spełnił moje oczekiwania, chociaż jest jeszcze miejsce na drobne usprawnienia.",
    gwiazdki: 3,
    verified: true,
  },
  {
    name: "t3dotgg",
    avatar: "https://github.com/t3dotgg.png",
    opinia: "Nowoczesne podejście i świetny design. Jestem bardzo zadowolony z efektu końcowego.",
    gwiazdki: 5,
    verified: true,
  },
  {
    name: "joshwcomeau",
    avatar: "https://github.com/joshwcomeau.png",
    opinia: "Obsługa klienta na wysokim poziomie. Polecam każdemu.",
    gwiazdki: 4.8,
    verified: true,
  },
]

export default function Home() {
  const [opinie, setOpinie] = useState<Opinia[]>(initialOpinie)

  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const [rate, setRate] = useState<number | "">("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!name.trim() || !review.trim() || rate === "") {
      setError("All fields are required.")
      return
    }

    if (Number(rate) < 0 || Number(rate) > 5) {
      setError("Rating must be between 0 and 5.")
      return
    }

    const newOpinion: Opinia = {
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
      )}`,
      opinia: review,
      gwiazdki: Number(rate),
      verified: false,
    }

    setOpinie((prev) => [newOpinion, ...prev])

    // reset
    setName("")
    setReview("")
    setRate("")
    setError("")
  }

  return (
    <div className="flex w-screen min-h-screen items-center justify-center bg-gray-950 font-sans flex-row gap-10 p-10">

      {/* CAROUSEL */}
      <div className="w-[30%]">
        <Carousel opts={{ align: "start" }} orientation="vertical">
          <CarouselContent className="-mt-1 h-[300px]">
            {opinie.map((opinia, index) => (
              <CarouselItem key={index} className="basis-1/2 pt-1">
                <div className="p-1">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-3">

                      {/* Avatar + badge */}
                      <div className="relative w-fit">
                        <Avatar className="grayscale">
                          <AvatarImage src={opinia.avatar} />
                          <AvatarFallback>
                            {opinia.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        {opinia.verified && (
                          <div className="absolute -bottom-1 -right-1">
                            <AvatarBadge className="w-4 h-4 flex items-center justify-center">
                              <VerifiedIcon className="w-3 h-3 text-green-500 fill-green-500" />
                            </AvatarBadge>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="font-medium text-sm">
                          {opinia.name}
                        </div>
                        <Rating rate={opinia.gwiazdki} />
                      </div>

                    </CardHeader>

                    <CardContent className="p-6 text-sm text-muted-foreground">
                      {opinia.opinia}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* FORM */}
      <aside className="w-[50%] h-[50vh] flex flex-col items-center">
        <h1 className="text-2xl font-light p-5 text-white">
          Leave us a review!
        </h1>

        <Card className="w-[60%] p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Provide your name"
            />
          </div>

          <div>
            <label className="text-sm">Review</label>
            <Input
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Provide your review"
            />
          </div>

          <div>
            <label className="text-sm">Rate (0–5)</label>
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="Provide your rating"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </aside>
    </div>
  )
}