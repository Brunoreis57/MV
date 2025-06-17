import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Edit3 } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (src: string) => void;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = ''
}) => {
  const { isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(src);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(src);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <input
          type="url"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="URL da imagem"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img src={src} alt={alt} className={className} />
      {isEditMode && (
        <div
          onClick={() => setIsEditing(true)}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Edit3 className="w-8 h-8 text-white" />
        </div>
      )}
    </div>
  );
};