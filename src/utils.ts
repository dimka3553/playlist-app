export function format(
    num: number | string | undefined,
    decimals: number
): string {
    if (num == undefined) {
        return "∞";
    }

    if (num == null) {
        let output = "0.";
        for (let i = 0; i < decimals - 1; i++) {
            output += "0";
        }
        return output;
    }
    num = parseFloat(num.toString());

    if (num == -2) {
        let output = "0.";
        for (let i = 0; i < decimals - 1; i++) {
            output += "0";
        }
        return output;
    }

    if (num == -1) {
        return "∞";
    }

    if (num > -0.000000001 && num < 0.000000001) {
        let output = "0.";
        for (let i = 0; i < decimals - 1; i++) {
            output += "0";
        }
        return output;
    }

    if (num < 0.0001 && num > 0) {
        const formatter = new Intl.NumberFormat("en-US", {
            notation: "scientific",
            minimumSignificantDigits: decimals,
            maximumSignificantDigits: decimals,
        });
        return formatter.format(num);
    }

    if (num > 1000_000_000_000_000) {
        const formatter = new Intl.NumberFormat("en-US", {
            notation: "scientific",
            minimumSignificantDigits: decimals,
            maximumSignificantDigits: decimals,
        });
        return formatter.format(num);
    }

    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
        minimumSignificantDigits: decimals,
        maximumSignificantDigits: decimals,
    });
    return formatter.format(num);
}