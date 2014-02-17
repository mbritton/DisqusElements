## DisqusElements

This jQuery plugin extends Disqus http://disqus.com/ functionality by wrapping an element and creating a user interface for multiple discussion threads.

## Code Example

Here's the HTML you should paste into your page.

```
<div id="disqusTarget">
    <p id="testing01" class="disqusContentItem">The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p>
    <p id="testing02" class="disqusContentItem">Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p>
</div>
<div class="landingPage">
    <!-- Keep wrapper -- needed to identify Disqus module to plugin -->
    <div class="disqusWrapper">
        <!--Keep thread -- needed to write Disqus UI-->
        <div id="disqus_thread"></div>
    </div>
</div>
```

The element with an id attribute of "disqusTarget" contains two paragraph tags.  Each paragraph tag's id should be set to the discussion ID that will appear in Disqus Admin.


```
<script>

    var defaults = {
        showOnLanding:true,
        setURL:'https://disqus.com/api/3.0/threads/set.json',
        publicKey:'your_disqus_public_key',
        shortname:'your_shortname',
        title:'Title',
        identifier:'landing_page_discussion_identifier',
        baseurl:'http://your.url.com',
        url:'http://your.url.com/#!testing00'
    };

    $('#disqusTarget').disqusElements(defaults);

</script>
```

An object is created to configure the Disqus instance.  The element with an id attribute of "disqusTarget" is used to initialize the plugin.

See index.html for complete implementation.

## Motivation

This plugin exists to facilitate greater engagement in page content.

## Installation

Use Gruntfile.js to build to ./dist

## Contributors

Follow @mbritton on Twitter: https://twitter.com/mbritton

## License

BSD