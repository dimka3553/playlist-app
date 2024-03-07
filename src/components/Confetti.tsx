import confetti from "canvas-confetti";

export default function Confetti() {
    confetti({
        particleCount: 300,
        startVelocity: 40,
        spread: 450,
        origin: {
            x: 0,
            y: 0.2,
        },
    });
    confetti({
        particleCount: 300,
        startVelocity: 40,
        spread: 450,
        origin: {
            x: 1,
            y: 0.1,
        },
    });
}