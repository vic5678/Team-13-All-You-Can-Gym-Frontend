// A dedicated component to render a single session item
const SessionResultItem = ({ session }) => {
    return (
        <div
            style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
        >
            <div style={{ fontSize: 16, fontWeight: 700, color: "#42554F", marginBottom: 8 }}>
                {session.name}
            </div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                <span>{session.description}</span>
                <span>with {session.trainerName}</span>
                <span>📅 {new Date(session.dateTime).toLocaleDateString()} at {new Date(session.dateTime).toLocaleTimeString()}</span>
            </div>
            {session.keywords && session.keywords.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {session.keywords.map((keyword) => (
                        <span key={keyword} style={{ background: "#B8ED44", color: "#42554F", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>
                            {keyword}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SessionResultItem;