class Variant {
    constructor({ isMaster, size, retailPrice, discount, tags, isAvailable, isSale, orderCode, images }) {
        this.isMaster = isMaster;
        this.size = size; // Shown with product.baseUnit
        this.retailPrice = retailPrice;
        this.discount = discount;
        this.getPrice = function () {
            return Math.round(this.retailPrice - (this.retailPrice * this.discount) / 100);
        };
        this.getUnitPrice = function () {
            return Math.round((this.getPrice() / this.size) * 100);
        };
        this.tags = tags;
        this.isAvailable = isAvailable;
        this.isSale = isSale; // Enables coupon box
        this.orderCode = orderCode;
        this.images = images;
    }
}

const variants = [
    new Variant({
        isMaster: true,
        size: 100,
        retailPrice: 3320,
        discount: 40,
        tags: {
            sale: true,
            freeDelivery: true,
            new: false,
        },
        isAvailable: true,
        isSale: true,
        coupon: 20,
        couponCode: "NOTINO20",
        orderCode: "LAM1787",
        images: ["https://cdn.notinoimg.com/detail_zoom/lancome/3605533286555_01-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605533286555_02-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_09/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_3a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_5a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_6a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg"],
    }),
    new Variant({
        isMaster: false,
        size: 75,
        retailPrice: 2970,
        discount: 35,
        tags: {
            sale: false,
            freeDelivery: true,
            new: false,
        },
        isAvailable: true,
        isSale: true,
        coupon: 20,
        couponCode: "NOTINO20",
        orderCode: "LAM0616",
        images: ["https://cdn.notinoimg.com/detail_zoom/lancome/3605532612836_01-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___30.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612836_02-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___30.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_09/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_3a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_5a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_6a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg"],
    }),
    new Variant({
        isMaster: false,
        size: 50,
        retailPrice: 2440,
        discount: 30,
        tags: {
            sale: false,
            freeDelivery: false,
            new: false,
        },
        isAvailable: true,
        isSale: true,
        coupon: 20,
        couponCode: "NOTINO20",
        orderCode: "LAM7066",
        images: ["https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_01-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___33.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_02-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___33.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_09/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_3a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_5a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_6a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg"],
    }),
    new Variant({
        isMaster: false,
        size: 30,
        retailPrice: 1720,
        discount: 25,
        tags: {
            sale: false,
            freeDelivery: false,
            new: false,
        },
        isAvailable: false,
        isSale: false,
        coupon: undefined,
        couponCode: undefined,
        orderCode: "LAM1470",
        images: ["https://cdn.notinoimg.com/detail_zoom/lancome/3605532612690_01-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___30.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612690_02-o/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___30.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_09/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_3a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_5a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg", "https://cdn.notinoimg.com/detail_zoom/lancome/3605532612768_6a/lancome-la-vie-est-belle-parfemovana-voda-pro-zeny___24.jpg"],
    }),
];

// Config variable of the displayed product
export const product = {
    brand: "Lancôme",
    name: "La Vie Est Belle",
    category: "parfémovaná voda pro ženy",
    getMasterIndex: function () {
        for (let i = 0; i < this.variants.length; i++) {
            if (this.variants[i].isMaster) {
                return i;
            }
        }
        return 0; // Default value in case none of the variants is set as master
    },
    baseSize: 100, // Used to calculate unit price
    baseUnit: "ml",
    coupon: 20, // Shown in coupon box
    couponCode: "NOTINO20", // Shown in coupon box
    hasTryItFirst: true,
    hasEngraving: true,
    hasGift: true,
    variants: variants,
};
