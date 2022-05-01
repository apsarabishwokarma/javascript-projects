// Categories

const categoriesEl = document.querySelector(".categories");

categories.map((category) => {
  categoriesEl.innerHTML += CategoryComponent(category.icon, category.title);
});

// for (let i = 0; i < categories.length; i++) {
//   categoriesEl.innerHTML += CategoryComponent(
//     categories[i].icon,
//     categories[i].title
//   );
// }

// Subscriptions
const subscriptionEl = document.querySelector(".subscriptions");

subscriptions.map((subscription) => {
  subscriptionEl.innerHTML += SubscriptionComponent(
    subscription.img,
    subscription.name
  );
});
