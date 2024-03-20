import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DataRequestForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Request Data</CardTitle>
        <CardDescription>Choose the data to request</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Access">Access Mode</Label>
              <Input id="access" placeholder="Access Mode" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="intention">Intention</Label>
              <Input id="intention" placeholder="Intention" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="Duration" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="datacontrol">Data Control</Label>
              <Select>
                <SelectTrigger id="datacontrol">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="masked">Masked</SelectItem>
                  <SelectItem value="clear">Clear</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}
