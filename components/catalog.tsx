"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DataRequestForm } from './dataRequestForm';
import { DataRequestDeny } from './dataRequestDeny';
import { DataRequestGrant } from './dataRequestGrant';

export function Catalog() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleButtonClick = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const fetchData = async () => {
        try {
          const response = await fetch('/api/databricks');
          const data = await response.json();
          setData(data);
          setError(null);
        } catch (error) {
          setData(null);
        }
      };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Test</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add request</DialogTitle>
                    </DialogHeader>
                    {/* <Button onClick={fetchData}>Fetch Data</Button>
                    {data && <pre>{JSON.stringify(data,null,2)}</pre>} */}
                    <DataRequestForm />
                    <DataRequestDeny />
                    <DataRequestGrant />
                </DialogContent>
            </Dialog>
        </div>
    );
};