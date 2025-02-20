const Modal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="check-circle">✓</div>
                <p>Nota de credito asignada correctamente</p>
                <div>
                    <button 
                        onClick={() => { 
                            console.log('Asignación confirmada'); 
                            onClose();
                        }} 
                    >
                        Seguir Asignando
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal