Feature: End to End Ecommerce Validation

    Application Regression
@Regression
Scenario: Ecommerce Product Delivery
Given I open ecommerce page
When I add items to cart
|productName|
|Blackberry|
|Nokia Edge|
|iphone X|
When Vaidate the total price
Then Select the country submit and verify thank you

@Smoke
Scenario: Filling the form to shop
Given I open ecommerce page
When I fill the form details
|name|gender|
|bobz|Male|
And Vaidate the form behaviour
Then Select the shop Page
