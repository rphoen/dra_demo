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

export function DataRequestGrant() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Grant Data Request</CardTitle>
        <CardDescription>You are granting request for *placeholder*</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Access">Access Duration</Label>
              <Input id="access" placeholder="Access Duration" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="datacontrol">Data Controls</Label>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dataaccessmode">Data Access Mode</Label>
              <Input id="dataaccessmode" placeholder="Data Access Mode" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Grant Access</Button>
      </CardFooter>
    </Card>
  )
}
