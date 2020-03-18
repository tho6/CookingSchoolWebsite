declare module 'grant-express' {

	import express from 'express';

	type Provider = "23andme" | "500px" | "acton" | "acuityscheduling" | "aha" | "amazon" | "angellist" | "arcgis" | "asana" | "assembla" | "atlassian" | "auth0" | "authentiq" | "aweber" | "axosoft" | "baidu" | "basecamp" | "battlenet" | "beatport" | "bitbucket" | "bitly" | "box" | "buffer" | "campaignmonitor" | "cheddar" | "clio" | "coinbase" | "concur" | "constantcontact" | "coursera" | "dailymotion" | "deezer" | "delivery" | "deputy" | "deviantart" | "digitalocean" | "discogs" | "discord" | "disqus" | "docusign" | "dribbble" | "dropbox" | "ebay" | "echosign" | "ecwid" | "edmodo" | "egnyte" | "etsy" | "eventbrite" | "evernote" | "eyeem" | "facebook" | "familysearch" | "feedly" | "fitbit" | "flattr" | "flickr" | "flowdock" | "formstack" | "foursquare" | "freeagent" | "freelancer" | "freshbooks" | "geeklist" | "genius" | "getbase" | "getpocket" | "gitbook" | "github" | "gitlab" | "gitter" | "goodreads" | "google" | "groove" | "gumroad" | "harvest" | "hellosign" | "heroku" | "homeaway" | "hootsuite" | "ibm" | "iconfinder" | "idme" | "idonethis" | "imgur" | "infusionsoft" | "instagram" | "intuit" | "jamendo" | "jumplead" | "kakao" | "line" | "linkedin" | "live" | "livechat" | "lyft" | "mailchimp" | "mailup" | "mailxpert" | "mapmyfitness" | "mastodon" | "medium" | "meetup" | "mention" | "microsoft" | "mixcloud" | "mixer" | "moxtra" | "myob" | "naver" | "nest" | "nokotime" | "nylas" | "okta" | "onelogin" | "openstreetmap" | "optimizely" | "patreon" | "paypal" | "phantauth" | "pinterest" | "plurk" | "podio" | "producthunt" | "projectplace" | "pushbullet" | "qq" | "ravelry" | "redbooth" | "reddit" | "runkeeper" | "salesforce" | "shoeboxed" | "shopify" | "skyrock" | "slack" | "slice" | "smartsheet" | "smugmug" | "snapchat" | "socialpilot" | "socrata" | "soundcloud" | "spotify" | "square" | "stackexchange" | "stocktwits" | "stormz" | "strava" | "stripe" | "surveygizmo" | "surveymonkey" | "thingiverse" | "ticketbud" | "timelyapp" | "todoist" | "trakt" | "traxo" | "trello" | "tripit" | "tumblr" | "twitch" | "twitter" | "typeform" | "uber" | "underarmour" | "unsplash" | "upwork" | "uservoice" | "vend" | "venmo" | "verticalresponse" | "viadeo" | "vimeo" | "visualstudio" | "vk" | "wechat" | "weekdone" | "weibo" | "withings" | "wordpress" | "wrike" | "xero" | "xing" | "yahoo" | "yammer" | "yandex" | "zeit" | "zendesk" | "zoom"

	function grant(
		providers: { "defaults": DefaultOptions } & ProvidersOptions
	): express.RequestHandler;

	type ProvidersOptions = {
		[key in Provider]?: GrantOptions
	}


	interface DefaultOptions {
		protocol: "http" | "https"
		host: string
		transport: "querystring" | "session"
		state: boolean
	}
	interface GrantOptions {
		key: string
		secret: string
		scope: string[]
		nonce?: boolean,
		custom_params?: any,
		callback: string
	}

	export = grant;
}