import React, { useState } from 'react';
import { Button } from 'primereact/button';

interface RowSelectionPanelProps {
  onSelect: (rowId: string) => void;
}

const RowSelectionPanel: React.FC<RowSelectionPanelProps> = ({ onSelect }) => {
  const [rowInput, setRowInput] = useState("");

  const handleSubmit = () => {
    onSelect(rowInput);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Enter row number"  
        value={rowInput}
        onChange={(e) => setRowInput(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default RowSelectionPanel;
