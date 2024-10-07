"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Plus, X } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface APIConfig {
  name: string;
  baseURL: string;
  apiKey: string;
  isEnabled: boolean;
}

export function SettingsModal() {
  const [apis, setApis] = useState<APIConfig[]>([
    { name: 'OpenAI', baseURL: '', apiKey: '', isEnabled: true },
    { name: 'Ollama', baseURL: '', apiKey: '', isEnabled: false },
  ])
  const [isAddingAPI, setIsAddingAPI] = useState(false)
  const [newAPI, setNewAPI] = useState<APIConfig>({ name: '', baseURL: '', apiKey: '', isEnabled: true })

  const updateAPI = (index: number, field: keyof APIConfig, value: string | boolean) => {
    const newApis = [...apis]
    newApis[index] = { ...newApis[index], [field]: value }
    setApis(newApis)
  }

  const removeAPI = (index: number) => {
    const newApis = apis.filter((_, i) => i !== index)
    setApis(newApis)
  }

  const handleAddNewAPI = () => {
    if (newAPI.name && newAPI.baseURL && newAPI.apiKey) {
      setApis([...apis, newAPI])
      setNewAPI({ name: '', baseURL: '', apiKey: '', isEnabled: true })
      setIsAddingAPI(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto">
          {apis.map((api, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${api.name.toLowerCase()}-switch`} className="text-base font-semibold">{api.name} API</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${api.name.toLowerCase()}-switch`}
                    checked={api.isEnabled}
                    onCheckedChange={(value) => updateAPI(index, 'isEnabled', value)}
                  />
                  {index > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeAPI(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {api.isEnabled && (
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={`${api.name.toLowerCase()}-base-url`} className="text-right">Base URL:</Label>
                    <Input
                      id={`${api.name.toLowerCase()}-base-url`}
                      value={api.baseURL}
                      onChange={(e) => updateAPI(index, 'baseURL', e.target.value)}
                      placeholder={`https://api.${api.name.toLowerCase()}.com/v1`}
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={`${api.name.toLowerCase()}-api-key`} className="text-right">API Key:</Label>
                    <Input
                      id={`${api.name.toLowerCase()}-api-key`}
                      value={api.apiKey}
                      onChange={(e) => updateAPI(index, 'apiKey', e.target.value)}
                      type="password"
                      className="col-span-2"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Button className="w-full" variant="outline" onClick={() => setIsAddingAPI(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New API
          </Button>
        </div>
        <Button type="submit">Save changes</Button>
      </DialogContent>

      <AlertDialog open={isAddingAPI} onOpenChange={setIsAddingAPI}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New API</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the details for the new API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newAPI.name}
                onChange={(e) => setNewAPI({ ...newAPI, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="baseURL" className="text-right">
                Base URL
              </Label>
              <Input
                id="baseURL"
                value={newAPI.baseURL}
                onChange={(e) => setNewAPI({ ...newAPI, baseURL: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input
                id="apiKey"
                value={newAPI.apiKey}
                onChange={(e) => setNewAPI({ ...newAPI, apiKey: e.target.value })}
                type="password"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddNewAPI}>Add API</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}