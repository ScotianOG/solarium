"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface CreateProposalProps {
  onClose: () => void
}

export function CreateProposal({ onClose }: CreateProposalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [votingPeriod, setVotingPeriod] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the proposal data to your backend
    console.log({ title, description, votingPeriod })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#161616] border-gray-800">
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
              className="bg-[#121212] border-gray-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your proposal"
              className="bg-[#121212] border-gray-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="votingPeriod">Voting Period (in days)</Label>
            <Input
              id="votingPeriod"
              type="number"
              value={votingPeriod}
              onChange={(e) => setVotingPeriod(e.target.value)}
              placeholder="Enter voting period"
              className="bg-[#121212] border-gray-800"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-800">
              Cancel
            </Button>
            <Button type="submit" className="gradient-button">
              Create Proposal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
