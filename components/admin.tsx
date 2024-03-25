import React from "react";
import { Button } from "./ui/button";

export function AdminPage() {
  const handleManageDataOwners = () => {
    // Logic for managing data owner lists
  };

  const handleManageReviewers = () => {
    // Logic for managing reviewer lists
  };

  return (
    <div className="grid grid-cols-4 gap-4 py-5">
      <Button >Manage Data Owners</Button>
      <Button >Manage Reviewers</Button>
      {/* Add more buttons or components for other functions */}
    </div>
  );
};

