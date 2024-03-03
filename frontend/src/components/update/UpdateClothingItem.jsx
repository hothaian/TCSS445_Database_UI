import React, { useState, useEffect } from 'react';

const UpdateClothingItem = ({ itemId }) => {
  const [updatedItem, setUpdatedItem] = useState({});
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    // Fetch the current data of the clothing item based on itemId
    const fetchCurrentItemData = async () => {
      try {
        const response = await fetch(`/api/clothingitems/${itemId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch current item data');
        }
        const currentItemData = await response.json();
        setUpdatedItem(currentItemData);
      } catch (error) {
        console.error('Error fetching current item data:', error);
      }
    };

    fetchCurrentItemData();
  }, [itemId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/clothing/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update clothing item');
      }

      const updatedItem = await response.json();
      setUpdatedData(updatedItem);
    } catch (error) {
      console.error('Error updating clothing item:', error);
    }
  };

  return (
    <div>
      <h2>Update Clothing Item</h2>

      <label htmlFor="updatedData">Updated Data:</label>
      <input
        type="text"
        id="updatedData"
        value={updatedData}
        onChange={(e) => setUpdatedData(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Clothing Item</button>

      {updatedItem && (
        <div>
          <h2>Updated Clothing Item:</h2>
          <pre>{JSON.stringify(updatedItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdateClothingItem;
