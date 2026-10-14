"use strict";


/* ============================================
   STATE
============================================ */

let currentStep = 1;

const totalSteps = 5;


const reportData = {

    reportType: "found",

    category: null,

    categoryName: null,

    itemType: null,

    itemTypeName: null,

    brand: null,

    customBrand: null,

    breed: null,

    customBreed: null,

    primaryColor: null,

    secondaryColor: null,

    distinctiveMarks: "",

    description: "",

    photoMethod: null,

    imageFile: null,

    locationMode: null,

    latitude: null,

    longitude: null,

    accuracy: null,

    yanbuRegion: null,

    neighborhood: null,

    locationDescription: null,

    foundDate: null,

    foundTime: null

};


/* ============================================
   DOM
============================================ */

const steps =
    document.querySelectorAll(".form-step");


const progressFill =
    document.getElementById("progressFill");


const stepText =
    document.getElementById("stepText");


const progressPercent =
    document.getElementById("progressPercent");


const previousButton =
    document.getElementById("previousButton");


const nextButton =
    document.getElementById("nextButton");


const dynamicFields =
    document.getElementById("dynamicFields");


const toast =
    document.getElementById("toast");


/* ============================================
   COLORS
============================================ */

const colors = [

    {
        value: "black",
        name: "أسود",
        color: "#111111"
    },

    {
        value: "white",
        name: "أبيض",
        color: "#ffffff"
    },

    {
        value: "blue",
        name: "أزرق",
        color: "#3278e8"
    },

    {
        value: "red",
        name: "أحمر",
        color: "#dc4242"
    },

    {
        value: "green",
        name: "أخضر",
        color: "#32a66a"
    },

    {
        value: "yellow",
        name: "أصفر",
        color: "#f2ce3e"
    },

    {
        value: "brown",
        name: "بني",
        color: "#875f3d"
    },

    {
        value: "purple",
        name: "بنفسجي",
        color: "#8256c9"
    },

    {
        value: "pink",
        name: "وردي",
        color: "#e88bad"
    },

    {
        value: "gray",
        name: "رمادي",
        color: "#8e949a"
    },

    {
        value: "orange",
        name: "برتقالي",
        color: "#ed8d35"
    },

    {
        value: "gold",
        name: "ذهبي",
        color: "#d2aa45"
    },

    {
        value: "silver",
        name: "فضي",
        color: "#bec4ca"
    },

    {
        value: "multi",
        name: "متعدد",
        color:
            "linear-gradient(135deg,#e64b4b,#e3cb3c,#45b56d,#408ada,#a355c7)"
    }

];


/* ============================================
   ITEM DATA
============================================ */

const itemTypes = {

    animal: [

        ["bird", "طائر"],
        ["cat", "قط"],
        ["dog", "كلب"],
        ["rabbit", "أرنب"],
        ["turtle", "سلحفاة"],
        ["fish", "سمكة"],
        ["goat", "ماعز"],
        ["sheep", "خروف"],
        ["horse", "حصان"],
        ["camel", "جمل"],
        ["cow", "بقرة"],
        ["other", "حيوان آخر"]

    ],


    electronics: [

        ["phone", "جوال"],
        ["tablet", "تابلت"],
        ["laptop", "لابتوب"],
        ["headphones", "سماعات"],
        ["smartwatch", "ساعة ذكية"],
        ["camera", "كاميرا"],
        ["gaming", "جهاز ألعاب"],
        ["charger", "شاحن"],
        ["power_bank", "شاحن متنقل"],
        ["router", "جهاز راوتر"],
        ["remote", "جهاز تحكم"],
        ["screen", "شاشة"],
        ["other", "إلكترونيات أخرى"]

    ],


    wallets: [

        ["wallet", "محفظة"],
        ["card_holder", "حافظة بطاقات"],
        ["handbag", "حقيبة يد"],
        ["backpack", "شنطة ظهر"],
        ["school_bag", "حقيبة مدرسية"],
        ["laptop_bag", "حقيبة لابتوب"],
        ["travel", "حقيبة سفر"],
        ["other", "أخرى"]

    ],


    keys: [

        ["car", "مفتاح سيارة"],
        ["car_remote", "ريموت سيارة"],
        ["house", "مفتاح منزل"],
        ["office", "مفتاح مكتب"],
        ["multiple", "مجموعة مفاتيح"],
        ["other", "مفتاح آخر"]

    ],


    documents: [

        ["id", "هوية"],
        ["residency", "إقامة"],
        ["license", "رخصة"],
        ["bank_card", "بطاقة بنكية"],
        ["work_card", "بطاقة عمل"],
        ["student_card", "بطاقة طالب"],
        ["passport", "جواز سفر"],
        ["certificate", "مستند"],
        ["other", "أوراق أخرى"]

    ],


    jewelry: [

        ["watch", "ساعة"],
        ["ring", "خاتم"],
        ["bracelet", "سوار"],
        ["necklace", "سلسلة"],
        ["earring", "حلق"],
        ["anklet", "خلخال"],
        ["brooch", "بروش"],
        ["other", "أخرى"]

    ],


    clothes: [

        ["shirt", "قميص / تيشيرت"],
        ["jacket", "جاكيت"],
        ["abaya", "عباءة"],
        ["headwear", "غطاء رأس"],
        ["shoes", "حذاء"],
        ["sandal", "صندل"],
        ["cap", "قبعة"],
        ["other", "أخرى"]

    ],


    personal: [

        ["glasses", "نظارة"],
        ["umbrella", "مظلة"],
        ["bottle", "قارورة"],
        ["book", "كتاب"],
        ["notebook", "دفتر"],
        ["prayer_beads", "سبحة"],
        ["hearing_aid", "سماعة طبية"],
        ["other", "غرض آخر"]

    ],


    sports: [

        ["ball", "كرة"],
        ["racket", "مضرب"],
        ["sports_bag", "حقيبة رياضية"],
        ["sports_shoes", "حذاء رياضي"],
        ["fitness_equipment", "معدات رياضية"],
        ["other", "آخر"]

    ],


    toys: [

        ["toy", "لعبة"],
        ["doll", "دمية"],
        ["electronic_toy", "لعبة إلكترونية"],
        ["educational_toy", "لعبة تعليمية"],
        ["toy_car", "سيارة لعبة"],
        ["building_blocks", "مكعبات"],
        ["other", "أخرى"]

    ],


    other: [

        ["other", "غير ذلك"]

    ]

};


const birdBreeds = [

    "بادجي",
    "كوكتيل",
    "روز",
    "كاسكو",
    "كناري",
    "حمام",
    "صقر",
    "ببغاء",
    "ماكاو",
    "كوكاتو"

];


const phoneBrands = [

    "Apple",
    "Samsung",
    "Huawei",
    "Honor",
    "Xiaomi",
    "Google",
    "OnePlus",
    "OPPO",
    "Vivo",
    "Realme",
    "Nokia"

];


const categorySearch =
    document.getElementById("categorySearch");


const categorySearchResults =
    document.getElementById("categorySearchResults");


const categoryButtons = [
    ...document.querySelectorAll(".category-card")
];


const itemTypeSearchAliases = {
    phone: ["موبايل", "تلفون", "هاتف"],
    wallet: ["جزدان"],
    cat: ["بسة", "هر"],
    car_remote: ["ريموت", "مفتاح سيارة"],
    bank_card: ["بطاقة صراف", "فيزا", "بطاقة ائتمان"]
};


/* ============================================
   START
============================================ */

renderColorOptions();

updateStepUI();

setDefaultDate();


/* ============================================
   CATEGORY
============================================ */

document
    .querySelectorAll(".category-card")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                selectCategory(
                    button.dataset.category,
                    button.dataset.name
                );
                categorySearch.value = "";
                renderCategorySearchResults();

            }
        );

    });


categorySearch.addEventListener(
    "input",
    renderCategorySearchResults
);


categorySearch.addEventListener(
    "keydown",
    (event) => {

        const firstResult =
            categorySearchResults.querySelector(
                ".category-search-result"
            );


        if (
            event.key === "ArrowDown" &&
            firstResult
        ) {

            event.preventDefault();
            firstResult.focus();

        } else if (
            event.key === "Enter" &&
            firstResult
        ) {

            event.preventDefault();
            firstResult.click();

        } else if (
            event.key === "Escape"
        ) {

            closeCategorySearchResults();

        }

    }
);


categorySearchResults.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeCategorySearchResults();
            categorySearch.focus();

        }

    }
);


document
    .querySelectorAll("[data-search-query]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                categorySearch.value =
                    button.dataset.searchQuery;

                renderCategorySearchResults();
                categorySearch.focus();

            }
        );

    });


function normalizeSearchText(value) {

    return value
        .normalize("NFD")
        .replace(/[\u064B-\u065F\u0670]/g, "")
        .replace(/[أإآ]/g, "ا")
        .replace(/ى/g, "ي")
        .toLocaleLowerCase("ar")
        .trim();

}


function selectCategory(
    category,
    categoryName,
    itemType = null,
    itemTypeName = null
) {

    categoryButtons.forEach((button) => {

        const isSelected =
            button.dataset.category === category;

        button.classList.toggle(
            "selected",
            isSelected
        );
        button.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

    });


    reportData.category = category;
    reportData.categoryName = categoryName;
    reportData.itemType = itemType;
    reportData.itemTypeName = itemTypeName;


    const status =
        document.getElementById(
            "categorySelectionStatus"
        );


    status.classList.add("selected");
    status.textContent = itemTypeName
        ? `تم اختيار: ${itemTypeName} — ${categoryName}`
        : `تم اختيار: ${categoryName}`;

}


function closeCategorySearchResults() {

    categorySearchResults.hidden = true;
    categorySearch.setAttribute(
        "aria-expanded",
        "false"
    );

}


function renderCategorySearchResults() {

    const query =
        normalizeSearchText(categorySearch.value);


    categorySearchResults.replaceChildren();


    if (!query) {

        closeCategorySearchResults();
        return;

    }


    const matches = [];


    categoryButtons.forEach((button) => {

        const category =
            button.dataset.category;

        const categoryName =
            button.dataset.name;

        const normalizedCategory =
            normalizeSearchText(categoryName);


        if (normalizedCategory.includes(query)) {

            matches.push({
                category,
                categoryName,
                title: categoryName,
                subtitle: "تصنيف كامل",
                icon: button.querySelector("span").textContent,
                type: null,
                typeName: null,
                rank: normalizedCategory.startsWith(query) ? 0 : 2
            });

        }


        (itemTypes[category] || []).forEach(
            ([type, typeName]) => {

                const searchableText = [
                    typeName,
                    ...(itemTypeSearchAliases[type] || [])
                ]
                    .map(normalizeSearchText)
                    .join(" ");


                if (!searchableText.includes(query)) {
                    return;
                }


                matches.push({
                    category,
                    categoryName,
                    title: typeName,
                    subtitle: categoryName,
                    icon: button.querySelector("span").textContent,
                    type,
                    typeName,
                    rank: searchableText
                        .split(/\s+/)
                        .some((word) => word.startsWith(query))
                            ? 0
                            : 1
                });

            }
        );

    });


    matches
        .sort((first, second) => first.rank - second.rank)
        .slice(0, 7)
        .forEach((match) => {

            const result =
                document.createElement("button");

            result.type = "button";
            result.className = "category-search-result";
            result.setAttribute("role", "option");
            result.setAttribute("aria-selected", "false");


            const icon =
                document.createElement("span");

            icon.className = "category-search-result-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = match.icon;


            const copy =
                document.createElement("span");

            copy.className = "category-search-result-copy";


            const title =
                document.createElement("strong");

            title.textContent = match.title;


            const subtitle =
                document.createElement("small");

            subtitle.textContent = match.subtitle;


            const action =
                document.createElement("span");

            action.className = "category-search-result-action";
            action.textContent = "اختيار";


            copy.append(title, subtitle);
            result.append(icon, copy, action);

            result.addEventListener(
                "click",
                () => {

                    selectCategory(
                        match.category,
                        match.categoryName,
                        match.type,
                        match.typeName
                    );
                    closeCategorySearchResults();

                }
            );


            categorySearchResults.appendChild(result);

        });


    if (!matches.length) {

        const empty =
            document.createElement("p");

        empty.className = "category-search-empty";
        empty.textContent =
            "ما لقينا اقتراحاً مطابقاً. جرّب كلمة أبسط أو اختر تصنيفاً من الأسفل.";

        categorySearchResults.appendChild(empty);

    }


    categorySearchResults.hidden = false;
    categorySearch.setAttribute(
        "aria-expanded",
        "true"
    );

}


/* ============================================
   DYNAMIC FIELDS
============================================ */

function renderDynamicFields() {

    dynamicFields.innerHTML = "";


    const types =
        itemTypes[
            reportData.category
        ] || [];


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "dynamic-field";


    wrapper.innerHTML = `

        <label>
            النوع
        </label>

        <select id="itemTypeSelect">

            <option value="">
                اختر النوع
            </option>

            ${types.map(
                ([value, name]) => `
                    <option value="${value}">
                        ${name}
                    </option>
                `
            ).join("")}

        </select>

    `;


    dynamicFields.appendChild(
        wrapper
    );


    document
        .getElementById(
            "itemTypeSelect"
        )
        .addEventListener(
            "change",
            handleItemTypeChange
        );


    const itemTypeSelect =
        document.getElementById("itemTypeSelect");


    if (reportData.itemType) {

        itemTypeSelect.value =
            reportData.itemType;

        handleItemTypeChange({
            target: itemTypeSelect
        });

    }

}


/* ============================================
   TYPE CHANGE
============================================ */

function handleItemTypeChange(event) {

    const value =
        event.target.value;


    const selectedOption =
        event.target.options[
            event.target.selectedIndex
        ];


    reportData.itemType =
        value || null;


    reportData.itemTypeName =
        value
            ? selectedOption.textContent.trim()
            : null;


    removeExtraDynamicFields();


    if (
        reportData.category === "animal"
    ) {

        renderAnimalDetails(value);

    }


    if (
        reportData.category === "electronics"
    ) {

        renderElectronicsDetails(value);

    }


    updateDescriptionExample();

}


/* ============================================
   REMOVE EXTRA
============================================ */

function removeExtraDynamicFields() {

    document
        .querySelectorAll(
            ".extra-dynamic"
        )
        .forEach((element) => {

            element.remove();

        });

}


/* ============================================
   ANIMAL
============================================ */

function renderAnimalDetails(type) {

    if (!type) {
        return;
    }


    const extra =
        document.createElement("div");


    extra.className =
        "extra-dynamic";


    if (type === "bird") {

        extra.innerHTML = `

            <div class="dynamic-field">

                <label>
                    هل تعرف نوع الطائر؟
                </label>

                <select id="knowBreed">

                    <option value="">
                        اختر
                    </option>

                    <option value="yes">
                        نعم
                    </option>

                    <option value="no">
                        لا أعرف
                    </option>

                </select>

            </div>

            <div
                class="dynamic-field"
                id="breedField"
                style="display:none;"
            >

                <label>
                    نوع الطائر
                </label>

                <select id="breedSelect">

                    <option value="">
                        اختر النوع
                    </option>

                    ${birdBreeds.map(
                        (breed) => `
                            <option value="${breed}">
                                ${breed}
                            </option>
                        `
                    ).join("")}

                    <option value="other">
                        غير ذلك
                    </option>

                </select>

            </div>

            <div
                class="dynamic-field"
                id="customBreedField"
                style="display:none;"
            >

                <label>
                    اكتب النوع
                </label>

                <input
                    id="customBreedInput"
                    type="text"
                    placeholder="اكتب نوع الطائر"
                >

            </div>

        `;


        dynamicFields.appendChild(
            extra
        );


        document
            .getElementById(
                "knowBreed"
            )
            .addEventListener(
                "change",
                (event) => {

                    const breedField =
                        document.getElementById(
                            "breedField"
                        );


                    if (
                        event.target.value ===
                        "yes"
                    ) {

                        breedField.style.display =
                            "block";

                    } else {

                        breedField.style.display =
                            "none";

                        reportData.breed =
                            null;

                    }

                }
            );


        document
            .getElementById(
                "breedSelect"
            )
            .addEventListener(
                "change",
                (event) => {

                    reportData.breed =
                        event.target.value;


                    const custom =
                        document.getElementById(
                            "customBreedField"
                        );


                    custom.style.display =
                        event.target.value ===
                        "other"
                            ? "block"
                            : "none";

                }
            );

    }


    const petExtra =
        document.createElement("div");


    petExtra.className =
        "extra-dynamic";


    petExtra.innerHTML = `

        <div class="dynamic-field">

            <label>
                هل يوجد طوق أو علامة ظاهرة؟
            </label>

            <select id="animalMark">

                <option value="">
                    اختر
                </option>

                <option value="yes">
                    نعم
                </option>

                <option value="no">
                    لا
                </option>

                <option value="unknown">
                    غير متأكد
                </option>

            </select>

        </div>

    `;


    dynamicFields.appendChild(
        petExtra
    );

}


/* ============================================
   ELECTRONICS
============================================ */

function renderElectronicsDetails(type) {

    if (!type) {
        return;
    }


    if (type === "phone") {

        const extra =
            document.createElement("div");


        extra.className =
            "extra-dynamic";


        extra.innerHTML = `

            <div class="dynamic-field">

                <label>
                    هل تعرف الشركة؟
                </label>

                <select id="phoneBrand">

                    <option value="">
                        لا أعرف / اختر
                    </option>

                    ${phoneBrands.map(
                        (brand) => `
                            <option value="${brand}">
                                ${brand}
                            </option>
                        `
                    ).join("")}

                    <option value="other">
                        غير ذلك
                    </option>

                </select>

            </div>


            <div
                class="dynamic-field"
                id="customBrandField"
                style="display:none;"
            >

                <label>
                    اسم الشركة
                </label>

                <input
                    id="customBrandInput"
                    type="text"
                    placeholder="اكتب اسم الشركة"
                >

            </div>


            <div class="dynamic-field">

                <label>
                    الموديل إن كنت تعرفه
                </label>

                <input
                    id="deviceModel"
                    type="text"
                    placeholder="مثال: iPhone 16 Pro Max"
                >

            </div>

        `;


        dynamicFields.appendChild(
            extra
        );


        document
            .getElementById(
                "phoneBrand"
            )
            .addEventListener(
                "change",
                (event) => {

                    reportData.brand =
                        event.target.value;


                    const customField =
                        document.getElementById(
                            "customBrandField"
                        );


                    customField.style.display =
                        event.target.value ===
                        "other"
                            ? "block"
                            : "none";

                }
            );

    }

}


/* ============================================
   DESCRIPTION EXAMPLE
============================================ */

function updateDescriptionExample() {

    const example =
        document.getElementById(
            "descriptionExample"
        );


    if (
        reportData.category ===
        "animal"
    ) {

        example.textContent =
            "مثال: قط أبيض وأسود، عيونه خضراء ويلبس طوق أحمر.";

        return;

    }


    if (
        reportData.itemType ===
        "phone"
    ) {

        example.textContent =
            "مثال: جوال أسود بكفر شفاف ويوجد خدش بسيط بجانب الكاميرا.";

        return;

    }


    example.textContent =
        "اكتب أي تفاصيل تساعد الإدارة في التعرف على الغرض.";

}


/* ============================================
   COLOR
============================================ */

function renderColorOptions() {

    renderColorSet(
        "primaryColors",
        "primary"
    );


    renderColorSet(
        "secondaryColors",
        "secondary"
    );

}


function renderColorSet(
    containerId,
    type
) {

    const container =
        document.getElementById(
            containerId
        );


    colors.forEach((color) => {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "color-option";


        button.innerHTML = `

            <span
                class="color-dot"
                style="background:${color.color};"
            ></span>

            ${color.name}

        `;


        button.addEventListener(
            "click",
            () => {

                container
                    .querySelectorAll(
                        ".color-option"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                if (type === "primary") {

                    reportData.primaryColor =
                        color.name;

                } else {

                    reportData.secondaryColor =
                        color.name;

                }

            }
        );


        container.appendChild(
            button
        );

    });


    if (type === "secondary") {

        const none =
            document.createElement(
                "button"
            );


        none.type =
            "button";


        none.className =
            "color-option";


        none.textContent =
            "لا يوجد";


        none.addEventListener(
            "click",
            () => {

                container
                    .querySelectorAll(
                        ".color-option"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                none.classList.add(
                    "selected"
                );


                reportData.secondaryColor =
                    null;

            }
        );


        container.appendChild(
            none
        );

    }

}


/* ============================================
   PHOTO
============================================ */

document
    .querySelectorAll(
        ".photo-option"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".photo-option"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                reportData.photoMethod =
                    button.dataset.photo;


                if (
                    reportData.photoMethod ===
                    "camera"
                ) {

                    document
                        .getElementById(
                            "cameraInput"
                        )
                        .click();

                }


                if (
                    reportData.photoMethod ===
                    "gallery"
                ) {

                    document
                        .getElementById(
                            "galleryInput"
                        )
                        .click();

                }

            }
        );

    });


document
    .getElementById(
        "cameraInput"
    )
    .addEventListener(
        "change",
        handleImageSelected
    );


document
    .getElementById(
        "galleryInput"
    )
    .addEventListener(
        "change",
        handleImageSelected
    );


function handleImageSelected(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    reportData.imageFile =
        file;


    const reader =
        new FileReader();


    reader.onload =
        (loadEvent) => {

            const preview =
                document.getElementById(
                    "imagePreview"
                );


            preview.src =
                loadEvent.target.result;


            document
                .getElementById(
                    "imagePreviewWrapper"
                )
                .classList.add(
                    "show"
                );

        };


    reader.readAsDataURL(
        file
    );

}


document
    .getElementById(
        "removeImageButton"
    )
    .addEventListener(
        "click",
        () => {

            reportData.imageFile =
                null;


            document
                .getElementById(
                    "imagePreviewWrapper"
                )
                .classList.remove(
                    "show"
                );


            document
                .getElementById(
                    "imagePreview"
                )
                .src = "";

        }
    );


/* ============================================
   LOCATION MODE
============================================ */

const currentLocationChoice =
    document.getElementById(
        "currentLocationChoice"
    );


const manualLocationChoice =
    document.getElementById(
        "manualLocationChoice"
    );


currentLocationChoice.addEventListener(
    "click",
    () => {

        setLocationMode(
            "gps"
        );

    }
);


manualLocationChoice.addEventListener(
    "click",
    () => {

        setLocationMode(
            "manual"
        );

    }
);


function setLocationMode(mode) {

    reportData.locationMode =
        mode;


    currentLocationChoice
        .classList.toggle(
            "selected",
            mode === "gps"
        );


    manualLocationChoice
        .classList.toggle(
            "selected",
            mode === "manual"
        );


    document
        .getElementById(
            "gpsLocationBox"
        )
        .classList.toggle(
            "show",
            mode === "gps"
        );


    document
        .getElementById(
            "manualLocationBox"
        )
        .classList.toggle(
            "show",
            mode === "manual"
        );

}


/* ============================================
   GPS
============================================ */

document
    .getElementById(
        "getLocationButton"
    )
    .addEventListener(
        "click",
        () => {

            const status =
                document.getElementById(
                    "gpsStatus"
                );


            if (
                !navigator.geolocation
            ) {

                status.textContent =
                    "المتصفح لا يدعم تحديد الموقع.";

                return;

            }


            status.textContent =
                "جاري تحديد الموقع بدقة...";


            navigator
                .geolocation
                .getCurrentPosition(

                    locationSuccess,

                    locationError,

                    {
                        enableHighAccuracy:
                            true,

                        timeout:
                            15000,

                        maximumAge:
                            0
                    }

                );

        }
    );


function locationSuccess(position) {

    const coords =
        position.coords;


    reportData.latitude =
        coords.latitude;


    reportData.longitude =
        coords.longitude;


    reportData.accuracy =
        coords.accuracy;


    document
        .getElementById(
            "latitudeText"
        )
        .textContent =
        coords.latitude.toFixed(7);


    document
        .getElementById(
            "longitudeText"
        )
        .textContent =
        coords.longitude.toFixed(7);


    document
        .getElementById(
            "accuracyText"
        )
        .textContent =
        `±${Math.round(coords.accuracy)} متر`;


    document
        .getElementById(
            "coordinatesCard"
        )
        .classList.add(
            "show"
        );


    document
        .getElementById(
            "gpsStatus"
        )
        .textContent =
        "تم تحديد موقعك بنجاح ✅";

}


function locationError(error) {

    const status =
        document.getElementById(
            "gpsStatus"
        );


    switch (
        error.code
    ) {

        case 1:

            status.textContent =
                "تم رفض إذن الوصول إلى الموقع.";

            break;


        case 2:

            status.textContent =
                "تعذر تحديد الموقع حالياً.";

            break;


        case 3:

            status.textContent =
                "انتهت مهلة تحديد الموقع.";

            break;


        default:

            status.textContent =
                "حدث خطأ أثناء تحديد الموقع.";

    }

}


/* ============================================
   STEP NAVIGATION
============================================ */

nextButton.addEventListener(
    "click",
    () => {

        if (
            !validateCurrentStep()
        ) {

            return;

        }


        collectCurrentStep();


        if (
            currentStep <
            totalSteps
        ) {

            currentStep++;

            if (
                currentStep === 2
            ) {

                renderDynamicFields();

            }


            if (
                currentStep === 5
            ) {

                buildSummary();

            }


            updateStepUI();

        }

    }
);


previousButton.addEventListener(
    "click",
    () => {

        collectCurrentStep();


        if (
            currentStep > 1
        ) {

            currentStep--;

            updateStepUI();

        }

    }
);


/* ============================================
   UI STEP
============================================ */

function updateStepUI() {
    document.querySelectorAll("[data-report-stage]").forEach(stage => {
        const number = Number(stage.dataset.reportStage);
        stage.classList.toggle("current", number === currentStep);
        stage.classList.toggle("complete", number < currentStep);
        if (number === currentStep) stage.setAttribute("aria-current", "step");
        else stage.removeAttribute("aria-current");
    });

    steps.forEach((step) => {

        step.classList.toggle(
            "active",
            Number(
                step.dataset.step
            ) === currentStep
        );

    });


    const percent =
        Math.round(
            (
                currentStep /
                totalSteps
            ) * 100
        );


    progressFill.style.width =
        `${percent}%`;


    progressPercent.textContent =
        `${percent}%`;


    stepText.textContent =
        `الخطوة ${currentStep} من ${totalSteps}`;


    previousButton.style.visibility =
        currentStep === 1
            ? "hidden"
            : "visible";


    nextButton.style.display =
        currentStep === totalSteps
            ? "none"
            : "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ============================================
   VALIDATION
============================================ */

function validateCurrentStep() {

    if (
        currentStep === 1 &&
        !reportData.category
    ) {

        showToast(
            "اختر نوع الغرض أولاً."
        );

        return false;

    }


    if (
        currentStep === 2 &&
        !reportData.primaryColor
    ) {

        showToast(
            "اختر اللون الأساسي."
        );

        return false;

    }


    if (
        currentStep === 4
    ) {

        collectCurrentStep();


        if (
            !reportData.locationMode
        ) {

            showToast(
                "حدد طريقة تحديد موقع العثور."
            );

            return false;

        }


        if (
            reportData.locationMode ===
            "gps" &&
            !reportData.latitude
        ) {

            showToast(
                "اضغط تحديد موقعي الحالي أولاً."
            );

            return false;

        }


        if (
            reportData.locationMode ===
            "manual" &&
            !reportData.yanbuRegion
        ) {

            showToast(
                "اختر ينبع البحر أو ينبع الصناعية."
            );

            return false;

        }

    }


    return true;

}


/* ============================================
   COLLECT DATA
============================================ */

function collectCurrentStep() {

    if (
        currentStep === 2
    ) {

        reportData.distinctiveMarks =
            document
                .getElementById(
                    "distinctiveMarks"
                )
                .value
                .trim();


        const customBreed =
            document.getElementById(
                "customBreedInput"
            );


        if (customBreed) {

            reportData.customBreed =
                customBreed.value.trim();

        }


        const customBrand =
            document.getElementById(
                "customBrandInput"
            );


        if (customBrand) {

            reportData.customBrand =
                customBrand.value.trim();

        }


        const model =
            document.getElementById(
                "deviceModel"
            );


        if (model) {

            reportData.model =
                model.value.trim();

        }

    }


    if (
        currentStep === 3
    ) {

        reportData.description =
            document
                .getElementById(
                    "itemDescription"
                )
                .value
                .trim();

    }


    if (
        currentStep === 4
    ) {

        reportData.yanbuRegion =
            document
                .getElementById(
                    "yanbuRegion"
                )
                .value;


        reportData.neighborhood =
            document
                .getElementById(
                    "neighborhoodInput"
                )
                .value
                .trim();


        reportData.locationDescription =
            document
                .getElementById(
                    "locationDescription"
                )
                .value
                .trim();


        reportData.foundDate =
            document
                .getElementById(
                    "foundDate"
                )
                .value;


        reportData.foundTime =
            document
                .getElementById(
                    "foundTime"
                )
                .value;

    }

}


/* ============================================
   SUMMARY
============================================ */

function buildSummary() {

    collectCurrentStep();


    const summary =
        document.getElementById(
            "reportSummary"
        );


    const regionName =
        reportData.yanbuRegion ===
        "yanbu-al-bahr"

            ? "ينبع البحر"

            : reportData.yanbuRegion ===
              "yanbu-industrial"

                ? "ينبع الصناعية"

                : "موقع GPS";


    const data = [

        [
            "نوع البلاغ",
            "عاثر"
        ],

        [
            "القسم",
            reportData.categoryName ||
            "-"
        ],

        [
            "النوع",
            reportData.itemTypeName ||
            "غير محدد"
        ],

        [
            "الماركة",
            reportData.customBrand ||
            reportData.brand ||
            "غير محدد"
        ],

        [
            "اللون الأساسي",
            reportData.primaryColor ||
            "-"
        ],

        [
            "اللون الثانوي",
            reportData.secondaryColor ||
            "لا يوجد"
        ],

        [
            "المنطقة",
            regionName
        ],

        [
            "الحي",
            reportData.neighborhood ||
            "غير محدد"
        ],

        [
            "تاريخ العثور",
            reportData.foundDate ||
            "غير محدد"
        ],

        [
            "الصورة",
            reportData.imageFile
                ? "تم إرفاق صورة"
                : "بدون صورة"
        ]

    ];


    summary.innerHTML =
        data
            .map(
                ([label, value]) => `

                    <div class="summary-item">

                        <span>
                            ${label}
                        </span>

                        <strong>
                            ${escapeHTML(
                                String(value)
                            )}
                        </strong>

                    </div>

                `
            )
            .join("");

}


/* ============================================
   SUBMIT
============================================ */

document
    .getElementById(
        "foundReportForm"
    )
    .addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            collectCurrentStep();


            const submitButton =
                event.currentTarget
                    .querySelector(
                        ".submit-report-button"
                    );


            const oldText =
                submitButton.textContent;


            submitButton.disabled =
                true;


            submitButton.textContent =
                "جاري إرسال البلاغ...";


            const regionName =
                reportData.locationMode === "gps"
                    ? null
                    : (
                        reportData.yanbuRegion ===
                        "yanbu-al-bahr"

                            ? "ينبع البحر"

                            : reportData.yanbuRegion ===
                              "yanbu-industrial"

                                ? "ينبع الصناعية"

                                : null
                    );


            const formData =
                new FormData();


            formData.append(
                "category",
                reportData.category || ""
            );


            formData.append(
                "itemType",
                reportData.itemType || ""
            );


            formData.append(
                "itemTypeName",
                reportData.itemTypeName || ""
            );


            formData.append(
                "brand",
                reportData.brand || ""
            );


            formData.append(
                "customBrand",
                reportData.customBrand || ""
            );


            formData.append(
                "model",
                reportData.model || ""
            );


            formData.append(
                "primaryColor",
                reportData.primaryColor || ""
            );


            formData.append(
                "secondaryColor",
                reportData.secondaryColor || ""
            );


            formData.append(
                "distinctiveMarks",
                reportData.distinctiveMarks || ""
            );


            formData.append(
                "description",
                reportData.description || ""
            );


            formData.append(
                "breed",
                reportData.breed || ""
            );


            formData.append(
                "customBreed",
                reportData.customBreed || ""
            );


            formData.append(
                "regionName",
                regionName || ""
            );


            formData.append(
                "neighborhood",
                reportData.neighborhood || ""
            );


            formData.append(
                "locationDescription",
                reportData.locationDescription || ""
            );


            formData.append(
                "latitude",
                reportData.latitude ?? ""
            );


            formData.append(
                "longitude",
                reportData.longitude ?? ""
            );


            formData.append(
                "accuracy",
                reportData.accuracy ?? ""
            );


            formData.append(
                "foundDate",
                reportData.foundDate || ""
            );


            formData.append(
                "foundTime",
                reportData.foundTime || ""
            );


            if (
                reportData.imageFile
            ) {

                formData.append(
                    "image",
                    reportData.imageFile
                );

            }


            try {

                const response =
                    await fetch(
                        "../backend/api/reports/create-found.php",
                        {
                            method:
                                "POST",

                            credentials:
                                "include",

                            body:
                                formData
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    showToast(
                        data.message ||
                        "تعذر إرسال البلاغ."
                    );

                    return;
                }


                showToast(
                    `تم إرسال البلاغ #${data.report.id} بنجاح ✅`
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "home.html?v=20261006-3";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    error
                );


                showToast(
                    "تعذر الاتصال بالسيرفر."
                );


            } finally {

                submitButton.disabled =
                    false;


                submitButton.textContent =
                    oldText;

            }

        }
    );

/* ============================================
   HOME
============================================ */

document
    .getElementById(
        "backHomeButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "home.html?v=20261006-3";

        }
    );


/* ============================================
   DATE
============================================ */

function setDefaultDate() {

    const today =
        new Date();


    const localDate =
        new Date(
            today.getTime() -
            today.getTimezoneOffset() *
            60000
        )
        .toISOString()
        .split("T")[0];


    document
        .getElementById(
            "foundDate"
        )
        .value =
        localDate;

}


/* ============================================
   TOAST
============================================ */

let toastTimer;


function showToast(message) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* ============================================
   SECURITY
============================================ */

function escapeHTML(value) {

    return value
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}