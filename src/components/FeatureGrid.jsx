import React from "react";

export default function FeatureGrid({
  features,
  onFeatureClick,
  circularPhotoSrc,
  photoAlt,
  photoWidth = 150,
  photoHeight = 150,
  photoMarginTop = 30,
  photoBoxShadow = "0 6px 14px rgba(0,0,0,0.25)",
  buttonContent,
  onButtonClick,
}) {
  return (
    <div
      style={{
        position: "relative",
        padding: "40px 24px 60px",
      }}
    >
      {/* features + circular photo */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 20,
          marginBottom: 50,
        }}
      >
        {/* left column: features */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => onFeatureClick(feature)}
              style={{
                display: "flex",
                gap: 15,
                alignItems: "flex-start",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--global-accent-color-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "var(--global-accent-color)",
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--global-accent-color)",
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--global-text-color-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {feature.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* right side: circular photo */}
        <div
          style={{
            flex: "0 0 " + photoWidth + "px",
            marginTop: photoMarginTop,
          }}
        >
          <div
            style={{
              width: photoWidth,
              height: photoHeight,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: photoBoxShadow,
            }}
          >
            <img
              src={circularPhotoSrc}
              alt={photoAlt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Button at bottom (optional) */}
      {buttonContent && onButtonClick && (
        <button
          onClick={onButtonClick}
          style={{
            marginTop: 80,
            width: "100%",
            padding: "18px 0",
            background: "var(--global-accent-color-secondary)",
            borderRadius: 999,
            border: "none",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "var(--global-accent-color)",
            cursor: "pointer",
          }}
        >
          {buttonContent}
        </button>
      )}
    </div>
  );
}
