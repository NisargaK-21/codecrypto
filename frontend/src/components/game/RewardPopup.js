// frontend/src/components/game/RewardPopup.js
export default function RewardPopup({ show }) {
  if (!show) return null;

  return (
    <div
      className="fixed top-10 right-10 bg-green-600 text-white p-4 rounded shadow-lg z-50"
      role="status"
    >
      🎉 Stage Completed
      <div className="text-sm">+50 XP</div>
    </div>
  );
}