"use strict";


/* ============================================
   STATE
============================================ */

let currentStep = 1;

const totalSteps = 5;


const reportData = {

    reportType: "lost",

    category: null,

    categoryName: null,

    itemType: null,

    itemTypeName: null,

    brand: null,

    customBrand: null,

    model: null,

    breed: null,

    customBreed: null,

    animalName: null,

    primaryColor: null,

    secondaryColor: null,

    distinctiveMarks: null,

    serialNumber: null,

    description: null,

    photoMethod: null,

    imageFile: null,

    locationMode: null,

    latitude: null,

    longitude: null,

    accuracy: null,

    yanbuRegion: null,

    neighborhood: null,

    locationDescription: null,

    lostDate: null,

    lostTime: null

};


/* ============================================
   DOM
============================================ */

const steps =
    document.querySelectorAll(
        ".form-step"
    );


const progressFill =
    document.getElementById(
        "progressFill"
    );


const stepText =
    document.getElementById(
        "stepText"
    );


const progressPercent =
    document.getElementById(
        "progressPercent"
    );


const previousButton =
    document.getElementById(
        "previousButton"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const dynamicFields =
    document.getElementById(
        "dynamicFields"
    );


const toast =
    document.getElementById(
        "toast"
    );


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
   CATEGORIES
============================================ */

const itemTypes = {

    animal: [

        ["bird", "طائر"],
        ["cat", "قط"],
        ["dog", "كلب"],
        ["rabbit", "أرنب"],
        ["turtle", "سلحفاة"],
        ["goat", "ماعز"],
        ["sheep", "خروف"],
        ["horse", "حصان"],
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
        ["other", "إلكترونيات أخرى"]

    ],


    wallets: [

        ["wallet", "محفظة"],
        ["handbag", "حقيبة يد"],
        ["backpack", "شنطة ظهر"],
        ["travel", "حقيبة سفر"],
        ["other", "أخرى"]

    ],


    keys: [

        ["car", "مفتاح سيارة"],
        ["house", "مفتاح منزل"],
        ["multiple", "مجموعة مفاتيح"],
        ["other", "أخرى"]

    ],


    documents: [

        ["id", "هوية"],
        ["license", "رخصة"],
        ["bank_card", "بطاقة بنكية"],
        ["passport", "جواز سفر"],
        ["certificate", "مستند"],
        ["other", "أخرى"]

    ],


    jewelry: [

        ["watch", "ساعة"],
        ["ring", "خاتم"],
        ["bracelet", "سوار"],
        ["necklace", "سلسلة"],
        ["earring", "حلق"],
        ["other", "أخرى"]

    ],


    clothes: [

        ["shirt", "قميص / تيشيرت"],
        ["jacket", "جاكيت"],
        ["shoes", "حذاء"],
        ["cap", "قبعة"],
        ["other", "أخرى"]

    ],


    personal: [

        ["glasses", "نظارة"],
        ["umbrella", "مظلة"],
        ["bottle", "قارورة"],
        ["book", "كتاب"],
        ["other", "أخرى"]

    ],


    sports: [

        ["ball", "كرة"],
        ["racket", "مضرب"],
        ["sports_bag", "حقيبة رياضية"],
        ["other", "أخرى"]

    ],


    toys: [

        ["toy", "لعبة"],
        ["doll", "دمية"],
        ["electronic_toy", "لعبة إلكترونية"],
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
    car: ["سيارة"],
    bank_card: ["بطاقة صراف", "فيزا", "بطاقة ائتمان"]
};


/* ============================================
   INIT
============================================ */

renderColorOptions();

setDefaultDate();

updateStepUI();


/* ============================================
   CATEGORY
============================================ */

document
    .querySelectorAll(
        ".category-card"
    )
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
   DYNAMIC DETAILS
============================================ */

function renderDynamicFields() {

    dynamicFields.innerHTML =
        "";


    const types =
        itemTypes[
            reportData.category
        ] || [];


    const wrapper =
        document.createElement(
            "div"
        );


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

            ${
                types.map(
                    ([value, name]) => `

                        <option value="${value}">
                            ${name}
                        </option>

                    `
                ).join("")
            }

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
   ITEM TYPE
============================================ */

function handleItemTypeChange(
    event
) {

    const value =
        event.target.value;


    const selected =
        event.target.options[
            event.target.selectedIndex
        ];


    reportData.itemType =
        value || null;


    reportData.itemTypeName =
        value
            ? selected.textContent.trim()
            : null;


    removeExtraDynamicFields();


    if (
        reportData.category ===
        "animal"
    ) {

        renderAnimalDetails(
            value
        );

    }


    if (
        reportData.category ===
        "electronics"
    ) {

        renderElectronicsDetails(
            value
        );

    }


    updateDescriptionExample();

}


function removeExtraDynamicFields() {

    document
        .querySelectorAll(
            ".extra-dynamic"
        )
        .forEach(
            (element) => {

                element.remove();

            }
        );

}


/* ============================================
   ANIMALS
============================================ */

function renderAnimalDetails(
    type
) {

    if (!type) {
        return;
    }


    const extra =
        document.createElement(
            "div"
        );


    extra.className =
        "extra-dynamic";


    let html = `

        <div class="dynamic-field">

            <label>
                اسم الحيوان
            </label>

            <input
                type="text"
                id="animalName"
                placeholder="مثال: ليو"
            >

            <p class="private-data-note">
                🔒 اسم الحيوان يمكن استخدامه للتحقق من المالك ولا يلزم نشره.
            </p>

        </div>

    `;


    if (
        type === "bird"
    ) {

        html += `

            <div class="dynamic-field">

                <label>
                    نوع الطائر
                </label>

                <select id="birdBreed">

                    <option value="">
                        اختر النوع
                    </option>

                    ${
                        birdBreeds.map(
                            (breed) => `

                                <option value="${breed}">
                                    ${breed}
                                </option>

                            `
                        ).join("")
                    }

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
                    اكتب نوع الطائر
                </label>

                <input
                    type="text"
                    id="customBreed"
                    placeholder="نوع الطائر"
                >

            </div>

        `;

    }


    html += `

        <div class="dynamic-field">

            <label>
                هل كان يلبس طوق أو علامة؟
            </label>

            <select id="animalCollar">

                <option value="">
                    اختر
                </option>

                <option value="yes">
                    نعم
                </option>

                <option value="no">
                    لا
                </option>

            </select>

        </div>

    `;


    extra.innerHTML =
        html;


    dynamicFields.appendChild(
        extra
    );


    const birdBreed =
        document.getElementById(
            "birdBreed"
        );


    if (birdBreed) {

        birdBreed.addEventListener(
            "change",
            () => {

                reportData.breed =
                    birdBreed.value;


                document
                    .getElementById(
                        "customBreedField"
                    )
                    .style.display =
                    birdBreed.value ===
                    "other"

                        ? "block"

                        : "none";

            }
        );

    }

}


/* ============================================
   ELECTRONICS
============================================ */

function renderElectronicsDetails(
    type
) {

    if (!type) {
        return;
    }


    const extra =
        document.createElement(
            "div"
        );


    extra.className =
        "extra-dynamic";


    if (
        type === "phone"
    ) {

        extra.innerHTML = `

            <div class="dynamic-field">

                <label>
                    الشركة
                </label>

                <select id="deviceBrand">

                    <option value="">
                        اختر الشركة
                    </option>

                    ${
                        phoneBrands.map(
                            (brand) => `

                                <option value="${brand}">
                                    ${brand}
                                </option>

                            `
                        ).join("")
                    }

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
                    الشركة
                </label>

                <input
                    id="customBrand"
                    type="text"
                    placeholder="اسم الشركة"
                >

            </div>


            <div class="dynamic-field">

                <label>
                    الموديل
                </label>

                <input
                    type="text"
                    id="deviceModel"
                    placeholder="مثال: iPhone 16 Pro Max"
                >

            </div>

        `;


        dynamicFields.appendChild(
            extra
        );


        document
            .getElementById(
                "deviceBrand"
            )
            .addEventListener(
                "change",
                (event) => {

                    reportData.brand =
                        event.target.value;


                    document
                        .getElementById(
                            "customBrandField"
                        )
                        .style.display =
                        event.target.value ===
                        "other"

                            ? "block"

                            : "none";

                }
            );

    }


    const serialNumberField =
        document.createElement("div");

    serialNumberField.className =
        "extra-dynamic";

    serialNumberField.innerHTML = `

        <div class="dynamic-field">

            <label for="serialNumber">
                الرقم التسلسلي إن وجد
            </label>

            <input
                type="text"
                id="serialNumber"
                placeholder="Serial Number / IMEI / رقم مميز"
            >

            <p class="private-data-note">
                لن يظهر هذا الرقم للعامة.
            </p>

        </div>

    `;

    dynamicFields.appendChild(serialNumberField);


    if (reportData.serialNumber) {

        document.getElementById("serialNumber").value =
            reportData.serialNumber;

    }

}


/* ============================================
   COLORS
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


    colors.forEach(
        (color) => {

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
                        .forEach(
                            (item) => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    if (
                        type === "primary"
                    ) {

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

        }
    );


    if (
        type === "secondary"
    ) {

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
                    .forEach(
                        (item) => {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


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
   DESCRIPTION
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
            "مثال: قط أبيض وأسود، عيونه خضراء، يلبس طوق أحمر وفي أذنه علامة صغيرة.";

        return;

    }


    if (
        reportData.itemType ===
        "phone"
    ) {

        example.textContent =
            "مثال: iPhone أسود بكفر شفاف ويوجد كسر صغير أسفل الكاميرا.";

        return;

    }


    example.textContent =
        "اذكر أي تفاصيل تساعد الإدارة في تمييز غرضك.";

}


/* ============================================
   PHOTO
============================================ */

document
    .querySelectorAll(
        ".photo-option"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".photo-option"
                        )
                        .forEach(
                            (item) => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


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

        }
    );


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


function handleImageSelected(
    event
) {

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

            document
                .getElementById(
                    "imagePreview"
                )
                .src =
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


function setLocationMode(
    mode
) {

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
   HIGH ACCURACY GPS
============================================ */

document
    .getElementById(
        "getLocationButton"
    )
    .addEventListener(
        "click",
        getAccurateLocation
    );


let bestPosition = null;

let gpsWatchId = null;

let gpsTimer = null;


function getAccurateLocation() {

    const status =
        document.getElementById(
            "gpsStatus"
        );


    const loading =
        document.getElementById(
            "gpsLoading"
        );


    if (
        !navigator.geolocation
    ) {

        status.textContent =
            "جهازك أو متصفحك لا يدعم تحديد الموقع.";

        return;

    }


    bestPosition =
        null;


    loading.classList.add(
        "show"
    );


    status.textContent =
        "نحاول الحصول على أدق إحداثية متاحة...";


    gpsWatchId =
        navigator.geolocation
            .watchPosition(

                (position) => {

                    if (
                        !bestPosition ||
                        position.coords.accuracy <
                        bestPosition.coords.accuracy
                    ) {

                        bestPosition =
                            position;


                        showPosition(
                            position,
                            false
                        );

                    }


                    if (
                        position.coords.accuracy <=
                        10
                    ) {

                        finishGPS();

                    }

                },

                (error) => {

                    handleLocationError(
                        error
                    );


                    finishGPS();

                },

                {
                    enableHighAccuracy:
                        true,

                    maximumAge:
                        0,

                    timeout:
                        20000
                }

            );


    gpsTimer =
        setTimeout(
            () => {

                finishGPS();

            },
            12000
        );

}


function finishGPS() {

    if (
        gpsWatchId !== null
    ) {

        navigator
            .geolocation
            .clearWatch(
                gpsWatchId
            );


        gpsWatchId =
            null;

    }


    if (gpsTimer) {

        clearTimeout(
            gpsTimer
        );

        gpsTimer =
            null;

    }


    document
        .getElementById(
            "gpsLoading"
        )
        .classList.remove(
            "show"
        );


    if (
        bestPosition
    ) {

        showPosition(
            bestPosition,
            true
        );

    }

}


function showPosition(
    position,
    finished
) {

    const {
        latitude,
        longitude,
        accuracy
    } =
        position.coords;


    reportData.latitude =
        latitude;


    reportData.longitude =
        longitude;


    reportData.accuracy =
        accuracy;


    document
        .getElementById(
            "latitudeText"
        )
        .textContent =
        latitude.toFixed(
            7
        );


    document
        .getElementById(
            "longitudeText"
        )
        .textContent =
        longitude.toFixed(
            7
        );


    document
        .getElementById(
            "accuracyText"
        )
        .textContent =
        `±${Math.round(accuracy)} متر`;


    document
        .getElementById(
            "coordinatesCard"
        )
        .classList.add(
            "show"
        );


    const status =
        document.getElementById(
            "gpsStatus"
        );


    status.textContent =
        finished

            ? "تم اعتماد أفضل موقع تم الحصول عليه ✅"

            : "تم العثور على موقع، جاري محاولة تحسين الدقة...";


    updateAccuracyQuality(
        accuracy
    );

}


function updateAccuracyQuality(
    accuracy
) {

    const element =
        document.getElementById(
            "accuracyQuality"
        );


    element.className =
        "accuracy-quality show";


    if (
        accuracy <= 10
    ) {

        element.classList.add(
            "excellent"
        );


        element.textContent =
            "دقة ممتازة جداً ✅";

        return;

    }


    if (
        accuracy <= 25
    ) {

        element.classList.add(
            "good"
        );


        element.textContent =
            "دقة جيدة ✅";

        return;

    }


    if (
        accuracy <= 60
    ) {

        element.classList.add(
            "medium"
        );


        element.textContent =
            "الدقة متوسطة. يفضل الوقوف في مكان مفتوح إن أمكن.";

        return;

    }


    element.classList.add(
        "weak"
    );


    element.textContent =
        "دقة الموقع ضعيفة. يفضل إعادة المحاولة في مكان مفتوح.";

}


function handleLocationError(
    error
) {

    const status =
        document.getElementById(
            "gpsStatus"
        );


    switch (
        error.code
    ) {

        case 1:

            status.textContent =
                "تم رفض إذن استخدام الموقع.";

            break;


        case 2:

            status.textContent =
                "تعذر الحصول على موقعك.";

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
   NAVIGATION
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
   STEP UI
============================================ */

function updateStepUI() {
    document.querySelectorAll("[data-report-stage]").forEach(stage => {
        const number = Number(stage.dataset.reportStage);
        stage.classList.toggle("current", number === currentStep);
        stage.classList.toggle("complete", number < currentStep);
        if (number === currentStep) stage.setAttribute("aria-current", "step");
        else stage.removeAttribute("aria-current");
    });

    steps.forEach(
        (step) => {

            step.classList.toggle(
                "active",
                Number(
                    step.dataset.step
                ) ===
                currentStep
            );

        }
    );


    const percent =
        Math.round(
            (
                currentStep /
                totalSteps
            ) *
            100
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
        currentStep ===
        totalSteps

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
                "حدد مكان فقدان الغرض."
            );

            return false;

        }


        if (
            reportData.locationMode ===
            "gps" &&
            reportData.latitude ===
            null
        ) {

            showToast(
                "حدد موقعك الحالي أولاً."
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


        if (
            !reportData.lostDate
        ) {

            showToast(
                "حدد تاريخ فقدان الغرض."
            );

            return false;

        }

    }


    return true;

}


/* ============================================
   COLLECT
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


        const serialNumber =
            document.getElementById("serialNumber");


        if (
            reportData.category === "electronics" &&
            serialNumber
        ) {

            reportData.serialNumber =
                serialNumber.value.trim();

        } else if (
            reportData.category !== "electronics"
        ) {

            reportData.serialNumber = null;

        }


        const brand =
            document.getElementById(
                "deviceBrand"
            );


        if (brand) {

            reportData.brand =
                brand.value;

        }


        const customBrand =
            document.getElementById(
                "customBrand"
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


        const animalName =
            document.getElementById(
                "animalName"
            );


        if (animalName) {

            reportData.animalName =
                animalName.value.trim();

        }


        const customBreed =
            document.getElementById(
                "customBreed"
            );


        if (customBreed) {

            reportData.customBreed =
                customBreed.value.trim();

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


        reportData.lostDate =
            document
                .getElementById(
                    "lostDate"
                )
                .value;


        reportData.lostTime =
            document
                .getElementById(
                    "lostTime"
                )
                .value;

    }

}


/* ============================================
   SUMMARY
============================================ */

function buildSummary() {

    const regionName =
        reportData.locationMode ===
        "gps"

            ? "تم تحديد الموقع بالإحداثيات"

            : reportData.yanbuRegion ===
              "yanbu-al-bahr"

                ? "ينبع البحر"

                : reportData.yanbuRegion ===
                  "yanbu-industrial"

                    ? "ينبع الصناعية"

                    : "غير محدد";


    const values = [

        [
            "نوع البلاغ",
            "فاقد"
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
            "الموديل",
            reportData.model ||
            "غير محدد"
        ],

        [
            "اللون",
            reportData.primaryColor ||
            "-"
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
            "تاريخ الفقد",
            reportData.lostDate ||
            "-"
        ],

        [
            "دقة GPS",
            reportData.accuracy

                ? `±${Math.round(
                    reportData.accuracy
                )} متر`

                : "لم يستخدم GPS"
        ],

        [
            "الصورة",
            reportData.imageFile

                ? "مرفقة"

                : "لا توجد"
        ]

    ];


    document
        .getElementById(
            "reportSummary"
        )
        .innerHTML =
        values.map(
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
        ).join("");

}


/* ============================================
   SUBMIT
============================================ */
document
    .getElementById(
        "lostReportForm"
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
                "serialNumber",
                reportData.serialNumber || ""
            );


            formData.append(
                "description",
                reportData.description || ""
            );


            formData.append(
                "animalName",
                reportData.animalName || ""
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
                "lostDate",
                reportData.lostDate || ""
            );


            formData.append(
                "lostTime",
                reportData.lostTime || ""
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
                        "../backend/api/reports/create-lost.php",
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
   DEFAULT DATE
============================================ */

function setDefaultDate() {

    const now =
        new Date();


    const localDate =
        new Date(
            now.getTime() -
            now.getTimezoneOffset() *
            60000
        )
        .toISOString()
        .split("T")[0];


    document
        .getElementById(
            "lostDate"
        )
        .value =
        localDate;

}


/* ============================================
   TOAST
============================================ */

let toastTimer;


function showToast(
    message
) {

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

function escapeHTML(
    value
) {

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