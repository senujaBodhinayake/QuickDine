import React, { useState } from 'react';

const EditOrderPopup = ({ items, onClose, onSave }) => {
  console.log('EditOrderPopup received items:', items);

  const [editedItems, setEditedItems] = useState(() =>
    Array.isArray(items)
      ? items.map(item => ({
          ...item,
          newQuantity: item.quantity,
        }))
      : []
  );

  const handleQuantityChange = (id, value) => {
    setEditedItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, newQuantity: Math.max(1, Number(value)) }
          : item
      )
    );
  };

  const handleSave = () => {
    const changed = editedItems.filter(
      item => item.newQuantity !== item.quantity
    );
    onSave(changed);
  };

  if (!Array.isArray(items)) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg text-center">
          <p className="text-gray-500">Loading order items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold text-emerald-700 mb-4">Edit Order Quantities</h2>
        <ul className="space-y-4">
          {editedItems.map(item => (
            <li key={item._id} className="flex justify-between items-center">
              <span className="font-medium text-gray-700">
                {item.menuItem?.name || item.name}
              </span>
              <input
                type="number"
                min="1"
                value={item.newQuantity}
                onChange={e => handleQuantityChange(item._id, e.target.value)}
                className="input input-sm w-20 input-bordered"
              />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button onClick={handleSave} className="btn btn-success">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderPopup;