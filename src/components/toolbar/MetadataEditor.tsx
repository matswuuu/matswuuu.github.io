import React, {useRef} from "react";
import type {Structure} from "../../types/Structure.ts";

interface MetadataEditorProps {
    structure: Structure;
    metadata: Map<string, any>;
    onChange: (structure: Structure, metadata: Map<string, any>) => void;
    onClose: () => void;
}

const MetadataEditor: React.FC<MetadataEditorProps> = ({ structure, metadata, onChange, onClose }) => {
    const inputs = useRef<Map<string, HTMLInputElement>>(new Map());

    const handleClose = () => {
        const newMetadata = new Map<string, any>(structure.metadata);
        for (const [key, input] of inputs.current) {
            newMetadata.set(key, input.value);
        }
        onChange(structure, newMetadata);
        onClose();
    };

    return (
        <div className="metadata-editor-modal" onClick={handleClose}>
            <div className="metadata-editor-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Metadata</h2>
                <table className="metadata-editor-table">
                    <tbody>
                    {[...metadata.entries()].map(([key]) => (
                        <tr key={key}>
                            <td className="metadata-editor-key">{key}</td>
                            <td className="metadata-editor-value">
                                <input
                                    type="text"
                                    defaultValue={(structure.metadata?.get(key) ?? '').toString()}
                                    ref={el => {
                                        if (el) inputs.current.set(key, el);
                                        else inputs.current.delete(key);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="metadata-editor-actions">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default MetadataEditor; 