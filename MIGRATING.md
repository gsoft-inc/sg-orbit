@sharegate/tachyons-sg -> @sharegate/tachyons
import @sharegate/tachyons-sg/css/tachyons.css -> import @sharegate/tachyons
import @sharegate/tachyons-sg/css/tachyons.legacy.css -> import @sharegate/tachyons/tachyons.legacy.css

@sharegate/semantic-ui-sg -> @sharegate/semantic-ui-theme
import @sharegate/semantic-ui-sg/button.css -> @sharegate/semantic-ui-theme/button.css

Now foundation must be imported by the consumer, it's not included anymore with tachyons.

RemoteSearchInput:
    - resultsFetcher
    - autoFocus -> autofocus

Foundation:
    @import "~@orbit-ui/foundation"; -> @import "~@orbit-ui/foundation/apricot";


# Migrate Apricot to Orbit UI

## Fonts

## Foundation

## Tachyons

## Semantic UI theme

## React components

### RemoteSearchInput

