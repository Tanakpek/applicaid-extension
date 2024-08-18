"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsDemo = void 0;
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const tabs_1 = require("@/components/ui/tabs");
function TabsDemo() {
    return (<tabs_1.Tabs defaultValue="resume" className="w-11/12 m-0">
            <tabs_1.TabsList className="grid w-full grid-cols-2">
                <tabs_1.TabsTrigger value="resume">Resume</tabs_1.TabsTrigger>
                <tabs_1.TabsTrigger value="cover">Cover Letter</tabs_1.TabsTrigger>
            </tabs_1.TabsList>
            <tabs_1.TabsContent value="resume">
                <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Resume</card_1.CardTitle>
                        <card_1.CardDescription>
                            Generate your resumes here. Choose a template and click generate when you're done.
                        </card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-2">
                        <div className="space-y-1">
                            <label_1.Label htmlFor="name">Name</label_1.Label>
                            <input_1.Input id="name" defaultValue="Pedro Duarte"/>
                        </div>
                        <div className="space-y-1">
                            <label_1.Label htmlFor="username">Username</label_1.Label>
                            <input_1.Input id="username" defaultValue="@peduarte"/>
                        </div>
                    </card_1.CardContent>
                    <card_1.CardFooter>
                        <button_1.Button>Generate</button_1.Button>
                    </card_1.CardFooter>
                </card_1.Card>
            </tabs_1.TabsContent>
            <tabs_1.TabsContent value="cover">
                <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Cover Letter</card_1.CardTitle>
                        <card_1.CardDescription>
                            Generate your cover letters here. Choose a template and click generate when you're done.
                        </card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-2">
                        <div className="space-y-1">
                            <label_1.Label htmlFor="current">Current password</label_1.Label>
                            <input_1.Input id="current" type="password"/>
                        </div>
                        <div className="space-y-1">
                            <label_1.Label htmlFor="new">New password</label_1.Label>
                            <input_1.Input id="new" type="password"/>
                        </div>
                    </card_1.CardContent>
                    <card_1.CardFooter>
                        <button_1.Button>Generate</button_1.Button>
                    </card_1.CardFooter>
                </card_1.Card>
            </tabs_1.TabsContent>
        </tabs_1.Tabs>);
}
exports.TabsDemo = TabsDemo;
