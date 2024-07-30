import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
    return (
        
        <Tabs defaultValue="resume" className="w-11/12 m-0">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="cover">Cover Letter</TabsTrigger>
            </TabsList>
            <TabsContent value="resume">
                <Card>
                    <CardHeader>
                        <CardTitle>Resume</CardTitle>
                        <CardDescription>
                            Generate your resumes here. Choose a template and click generate when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Generate</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="cover">
                <Card>
                    <CardHeader>
                        <CardTitle>Cover Letter</CardTitle>
                        <CardDescription>
                            Generate your cover letters here. Choose a template and click generate when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Generate</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}