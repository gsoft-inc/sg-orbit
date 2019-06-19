@sharegate/tachyons-sg -> @sharegate/tachyons
import @sharegate/tachyons-sg/css/tachyons.css -> import @sharegate/tachyons
import @sharegate/tachyons-sg/css/tachyons.legacy.css -> import @sharegate/tachyons/dist/tachyons.legacy.css

@sharegate/semantic-ui-sg -> @sharegate/semantic-ui-theme
import @sharegate/semantic-ui-sg/button.css -> @sharegate/semantic-ui-theme/dist/button.css

Now foundation must be imported by the consumer, this is not included anymore with tachyons.
