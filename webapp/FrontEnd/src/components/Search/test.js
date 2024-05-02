function removeVietnameseAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const stringWithVietnamese = "Việt Nam là một quốc gia đẹp!";
const stringWithoutVietnamese = removeVietnameseAccents(stringWithVietnamese);
console.log(stringWithoutVietnamese); // In ra: "Viet Nam la mot quoc gia dep!"
