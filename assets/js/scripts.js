import { product } from "./product.js";

const productVariants = document.querySelectorAll(".aside-product-variant");
// Setup master product as active variant
productVariants[product.getMasterIndex()].classList.add("aside-product-variant--selected");

// Loads static info about the product
const loadProduct = () => {
    // Display basic product info (brand, name, etc.)
    const globalBrand = document.querySelectorAll(".global-brand");
    const globalName = document.querySelectorAll(".global-name");
    document.title = `${product.brand} ${product.name} | notino.cz`;
    globalBrand.forEach((element) => {
        element.textContent = product.brand;
    });
    globalName.forEach((element) => {
        element.textContent = product.name;
    });
    const productBrand = document.querySelectorAll(".aside-product-brand");
    productBrand.forEach((element) => {
        element.textContent = product.brand;
    });
    const productName = document.querySelectorAll(".aside-product-name");
    productName.forEach((element) => {
        element.textContent = product.name;
    });
    const productCategory = document.querySelectorAll(".aside-product-category");
    productCategory.forEach((element) => {
        element.textContent = product.category;
    });

    // Display info related to Try It First and Engraving
    const tryItFirst = document.querySelector(".aside-product-service--try-it-first");
    const engraving = document.querySelector(".aside-product-service--engraving");
    if (product.hasTryItFirst) {
        tryItFirst.classList.remove("hidden");
    }
    if (product.hasEngraving) {
        engraving.classList.remove("hidden");
    }

    // Display related gifts
    const giftWrappers = document.querySelectorAll(".aside-product-gift-wrapper--gift");
    const giftLabels = document.querySelectorAll(".gallery-main-label-box--gift");
    if (product.hasGift) {
        giftWrappers.forEach((gift) => {
            gift.classList.remove("hidden");
        });
        giftLabels.forEach((label) => {
            label.classList.remove("hidden");
        });
    }

    // Display proper delivery estimate
    const deliveryEstimate = document.querySelector(".aside-product-delivery__estimate");
    const currentDate = new Date();
    const dateFormat = { weekday: "short", month: "numeric", day: "numeric" };
    deliveryEstimate.textContent = `${currentDate.toLocaleDateString("cs-CZ", dateFormat)}`;
};
loadProduct();

// Loads dynamic info about the product (used in variant switching)
const refreshProduct = (variantIndex) => {
    // Display proper images
    const mainImgs = document.querySelectorAll(".gallery-main__img");
    mainImgs.forEach((img, index) => {
        img.src = product.variants[variantIndex].images[index];
    });
    const thumbnailImgs = document.querySelectorAll(".gallery-thumbnail__img");
    thumbnailImgs.forEach((thumbnail, index) => {
        thumbnail.src = product.variants[variantIndex].images[index];
    });

    // Hide proper info in case product is not available
    const labelWrapper = document.querySelector(".gallery-main-label-wrapper");
    const tagsWrapper = document.querySelector(".aside-product-tags");
    const priceWrapper = document.querySelector(".aside-product-price");
    const couponWrapper = document.querySelector(".aside-product-coupon");
    const statusWrapper = document.querySelector(".aside-product-status-wrapper");
    const statusWrapperNA = document.querySelector(".aside-product-status-wrapper--na");
    const serviceWrapper = document.querySelector(".aside-product-service-wrapper");
    const buttonWrapper = document.querySelector(".aside-product-button-wrapper");
    const buttonWrapperNA = document.querySelector(".aside-product-button-wrapper--na");
    const giftWrapper = document.querySelectorAll(".aside-product-gift-wrapper--gift");
    const freeDeliveryOffer = document.querySelector(".aside-product-gift-wrapper--free-delivery-offer");
    const productDelivery = document.querySelector(".aside-product-delivery");
    if (!product.variants[variantIndex].isAvailable) {
        labelWrapper.classList.add("hidden");
        tagsWrapper.classList.add("hidden");
        priceWrapper.classList.add("hidden");
        couponWrapper.classList.add("hidden");
        statusWrapper.classList.add("hidden");
        statusWrapperNA.classList.remove("hidden");
        serviceWrapper.classList.add("hidden");
        buttonWrapper.classList.add("hidden");
        buttonWrapperNA.classList.remove("hidden");
        giftWrapper.forEach((element) => {
            element.classList.add("hidden");
        });
        freeDeliveryOffer.classList.add("hidden");
        productDelivery.classList.add("hidden");
    } else {
        if (labelWrapper.classList.contains("hidden")) {
            labelWrapper.classList.remove("hidden");
        }
        if (tagsWrapper.classList.contains("hidden")) {
            tagsWrapper.classList.remove("hidden");
        }
        if (priceWrapper.classList.contains("hidden")) {
            priceWrapper.classList.remove("hidden");
        }
        if (couponWrapper.classList.contains("hidden")) {
            couponWrapper.classList.remove("hidden");
        }
        if (serviceWrapper.classList.contains("hidden")) {
            serviceWrapper.classList.remove("hidden");
        }
        if (statusWrapper.classList.contains("hidden")) {
            statusWrapper.classList.remove("hidden");
            statusWrapperNA.classList.add("hidden");
        }
        if (buttonWrapper.classList.contains("hidden")) {
            buttonWrapper.classList.remove("hidden");
            buttonWrapperNA.classList.add("hidden");
        }
        giftWrapper.forEach((element) => {
            if (element.classList.contains("hidden")) {
                element.classList.remove("hidden");
            }
        });
        freeDeliveryOffer.classList.add("hidden");
        if (productDelivery.classList.contains("hidden")) {
            productDelivery.classList.remove("hidden");
        }
    }

    // Display Free Delivery Offer label
    const deliveryLabel = document.querySelector(".gallery-main-label-box--free-delivery-offer");
    if (!product.variants[variantIndex].tags.freeDelivery) {
        deliveryLabel.classList.remove("hidden");
    } else if (!deliveryLabel.classList.contains("hidden")) {
        deliveryLabel.classList.add("hidden");
    }

    // Display proper price for selected variant
    const priceCurrent = document.querySelector(".aside-product-price__current");
    const priceBefore = document.querySelector(".aside-product-price__before");
    const priceSavings = document.querySelector(".aside-product-price__savings");
    priceCurrent.textContent = `${product.variants[variantIndex].getPrice().toLocaleString("cs-CZ")} Kč`;
    priceBefore.textContent = `${product.variants[variantIndex].retailPrice.toLocaleString("cs-CZ")} Kč`;
    priceSavings.textContent = `Výhodněji o ${product.variants[variantIndex].discount} %`;

    // Display proper tags for each variant
    const productTags = document.querySelectorAll(".aside-product-tags__box");
    productTags.forEach((element) => {
        if (product.variants[variantIndex].tags.sale && element.classList.contains("aside-product-tags__box--sale")) {
            element.classList.remove("hidden");
        }
        if (!product.variants[variantIndex].tags.sale && element.classList.contains("aside-product-tags__box--sale") && !element.classList.contains("hidden")) {
            element.classList.add("hidden");
        }
        if (product.variants[variantIndex].tags.freeDelivery && element.classList.contains("aside-product-tags__box--free-delivery")) {
            element.classList.remove("hidden");
        }
        if (!product.variants[variantIndex].tags.freeDelivery && element.classList.contains("aside-product-tags__box--free-delivery") && !element.classList.contains("hidden")) {
            element.classList.add("hidden");
        }
        if (product.variants[variantIndex].tags.new && element.classList.contains("aside-product-tags__box--new")) {
            element.classList.remove("hidden");
        }
        if (!product.variants[variantIndex].tags.new && element.classList.contains("aside-product-tags__box--new") && !element.classList.contains("hidden")) {
            element.classList.add("hidden");
        }
    });

    // Display proper data in variant boxes
    const productSizes = document.querySelectorAll(".aside-product-variant__size");
    const productPrices = document.querySelectorAll(".aside-product-variant__price");
    // Tags
    productVariants.forEach((element, index) => {
        if (product.variants[index].tags.sale) {
            element.querySelector(".aside-product-variant__icon--sale").classList.remove("hidden");
        } else if (product.variants[index].tags.freeDelivery) {
            element.querySelector(".aside-product-variant__icon--free-delivery").classList.remove("hidden");
        } else if (product.variants[index].tags.new) {
            element.querySelector(".aside-product-variant__icon--new").classList.remove("hidden");
        }
    });
    // Sizes
    productSizes.forEach((element, index) => {
        element.textContent = `${product.variants[index].size} ${product.baseUnit}`;
    });
    // Prices
    productPrices.forEach((element, index) => {
        element.textContent = `${product.variants[index].getPrice().toLocaleString("cs-CZ")} Kč`;
    });
    // Availability
    productVariants.forEach((element, index) => {
        if (!product.variants[index].isAvailable) {
            element.classList.add("aside-product-variant--unavailable");
            element.querySelector(".aside-product-variant__price").textContent = "Nedostupné";
        }
    });

    // Display proper data in coupon box
    const couponBox = document.querySelector(".aside-product-coupon");
    const couponAmount = document.querySelector(".aside-coupon__amount");
    const couponCode = document.querySelector(".aside-coupon__code");
    if (product.variants[variantIndex].isSale) {
        if (couponBox.classList.contains("hidden")) {
            couponBox.classList.remove("hidden");
        }
        couponAmount.textContent = `${Math.round(product.variants[variantIndex].getPrice() - (product.variants[variantIndex].getPrice() * product.coupon) / 100).toLocaleString("cs-CZ")} Kč`;
        couponCode.textContent = product.couponCode;
    } else {
        if (!couponBox.classList.contains("hidden")) {
            couponBox.classList.add("hidden");
        }
    }

    // Display proper unit price
    const productUnitPrice = document.querySelector(".aside-product-unit-price");
    productUnitPrice.textContent = `${product.variants[variantIndex].getUnitPrice().toLocaleString("cs-CZ")} Kč / ${product.baseSize} ${product.baseUnit} vč. DPH`;

    // Display proper order code
    const productCode = document.querySelector(".aside-product-code");
    productCode.textContent = `Kód: ${product.variants[variantIndex].orderCode}`;

    // Display Free Delivery Offer section
    if (!product.variants[variantIndex].tags.freeDelivery) {
        freeDeliveryOffer.classList.remove("hidden");
    }
};
refreshProduct(product.getMasterIndex());

// Product variant switching
productVariants.forEach((variant, index) => {
    variant.addEventListener("click", () => {
        if (variant.classList.contains("aside-product-variant--selected")) {
            return;
        }
        for (const element of productVariants) {
            element.classList.remove("aside-product-variant--selected");
        }
        if (window.innerWidth >= 992) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        variant.classList.add("aside-product-variant--selected");
        refreshProduct(index);
    });
});

// Image switching (desktop)
const galleryThunmbnails = document.querySelectorAll(".gallery-thumbnail");
const galleryMainImg = document.querySelector(".gallery-main__img");
galleryThunmbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        if (thumbnail.classList.contains("gallery-thumbnail--active")) {
            return;
        }
        galleryThunmbnails.forEach((thumbnail) => {
            if (thumbnail.classList.contains("gallery-thumbnail--active")) {
                thumbnail.classList.remove("gallery-thumbnail--active");
            }
        });
        thumbnail.classList.add("gallery-thumbnail--active");
        galleryMainImg.src = thumbnail.querySelector(".gallery-thumbnail__img").src;
    });
});

// Image carousel (desktop)
const setupCarousel = () => {
    const chevronPrev = document.querySelector(".gallery-thumbnail__chevron--prev");
    const chevronNext = document.querySelector(".gallery-thumbnail__chevron--next");
    const galleryCarousel = document.querySelector(".gallery-thumbnail__carousel");
    if (galleryCarousel.scrollWidth > galleryCarousel.offsetWidth + 8) {
        if (chevronNext.classList.contains("hidden")) {
            chevronNext.classList.remove("hidden");
        }
        let scrollPosition = 0;
        chevronPrev.addEventListener("click", () => {
            if (scrollPosition > 0) {
                scrollPosition -= galleryCarousel.clientWidth;
                galleryCarousel.scrollLeft -= galleryCarousel.clientWidth;
            }
        });
        chevronNext.addEventListener("click", () => {
            if (scrollPosition < galleryCarousel.scrollWidth) {
                scrollPosition += galleryCarousel.clientWidth;
                galleryCarousel.scrollLeft += galleryCarousel.clientWidth;
            }
        });
        // Hide proper control based on scroll position
        galleryCarousel.addEventListener("scroll", () => {
            if (galleryCarousel.scrollLeft === 0) {
                chevronPrev.classList.add("hidden");
            }
            if (galleryCarousel.scrollLeft > 0 && chevronPrev.classList.contains("hidden")) {
                chevronPrev.classList.remove("hidden");
            }
            if (galleryCarousel.offsetWidth + galleryCarousel.scrollLeft < galleryCarousel.scrollWidth && chevronNext.classList.contains("hidden")) {
                chevronNext.classList.remove("hidden");
            }
            if (galleryCarousel.offsetWidth + galleryCarousel.scrollLeft >= galleryCarousel.scrollWidth) {
                chevronNext.classList.add("hidden");
            }
        });
    } else {
        chevronNext.classList.add("hidden");
    }
};
setupCarousel();
window.addEventListener("resize", setupCarousel);

// Image switching (mobile)
let touchstartX = 0;
let touchendX = 0;
const galleryMain = document.querySelector(".gallery-main");
const thumbnailImgs = document.querySelectorAll(".gallery-thumbnail__img");
let photoIndex = 0;
const progressBar = document.querySelector(".gallery-main-progress-bar");
const progressBarWidth = 100 / product.variants[product.getMasterIndex()].images.length;
progressBar.style.width = `${progressBarWidth}%`;
function checkDirection() {
    if (touchendX < touchstartX) {
        if (photoIndex === galleryThunmbnails.length - 1) {
            return;
        }
        if (photoIndex < galleryThunmbnails.length - 1) {
            photoIndex++;
        }
        galleryMainImg.classList.add("gallery-main__img--transition");
        setTimeout(() => {
            galleryMainImg.src = thumbnailImgs[photoIndex].src;
            galleryMainImg.classList.remove("gallery-main__img--transition");
        }, 125);
    }
    if (touchendX > touchstartX) {
        if (photoIndex === 0) {
            return;
        }
        if (photoIndex > 0) {
            photoIndex--;
        }
        galleryMainImg.classList.add("gallery-main__img--transition");
        setTimeout(() => {
            galleryMainImg.src = thumbnailImgs[photoIndex].src;
            galleryMainImg.classList.remove("gallery-main__img--transition");
        }, 125);
    }
    progressBar.style.left = `${photoIndex * progressBarWidth}%`;
}
galleryMain.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
});
galleryMain.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
});

// Tab switching (mobile)
const tabsMobile = document.querySelectorAll(".tab-mobile");
const tabsMobileTop = document.querySelectorAll(".tab-mobile-top");
tabsMobileTop.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        if (tabsMobile[index].classList.contains("tab-mobile--open")) {
            tabsMobile[index].classList.remove("tab-mobile--open");
        } else {
            tabsMobile.forEach((tab) => {
                if (tab.classList.contains("tab-mobile--open")) {
                    tab.classList.remove("tab-mobile--open");
                }
            });
            tabsMobile[index].classList.add("tab-mobile--open");
        }
    });
});

// Tab switching (desktop)
const tabsDesktop = document.querySelectorAll(".section-tabs .tab:not(.tab--anchor)");
const tabDesktopContents = document.querySelectorAll(".tab-content");
tabsDesktop.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        if (tab.classList.contains("tab--active")) {
            return;
        }
        tabsDesktop.forEach((tab) => {
            if (tab.classList.contains("tab--active")) {
                tab.classList.remove("tab--active");
            }
        });
        tab.classList.add("tab--active");
        tabDesktopContents.forEach((tabContent) => {
            if (tabContent.classList.contains("tab-content--visible")) {
                tabContent.classList.remove("tab-content--visible");
            }
        });
        tabDesktopContents[index].classList.add("tab-content--visible");
    });
});

// Setting aside height
const aside = document.querySelector(".aside");
const asideElements = document.querySelectorAll(".aside > div");
const setAsideHeight = () => {
    let asideElementsHeight = 0;
    asideElements.forEach((asideElement) => {
        asideElementsHeight = asideElementsHeight + asideElement.offsetHeight + parseInt(getComputedStyle(asideElement).getPropertyValue("margin-bottom"), 10);
    });
    aside.style.height = `${asideElementsHeight}px`;
};
setAsideHeight();
window.addEventListener("resize", setAsideHeight);

// Setting aside top value during scroll
const diff = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - parseInt(aside.style.height, 10);
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
const setAsideTop = () => {
    // Do nothing in case aside height doesn't exceed viewport height
    if (diff >= 0) {
        return;
    }
    const st = window.pageYOffset || document.documentElement.scrollTop;
    // Scroll down
    if (st > lastScrollTop) {
        parseInt(aside.style.top, 10) > diff ? (aside.style.top = `${parseInt(aside.style.top, 10) + lastScrollTop - st}px`) : (aside.style.top = `${diff - 24}px`);
    }
    // Scroll up
    else {
        parseInt(aside.style.top, 10) < 24 ? (aside.style.top = `${parseInt(aside.style.top, 10) + lastScrollTop - st}px`) : (aside.style.top = "24px");
    }
    lastScrollTop = st <= 0 ? 0 : st;
};
window.addEventListener("scroll", setAsideTop, false);
