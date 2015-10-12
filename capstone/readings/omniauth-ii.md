# OmniAuth cont.

Now that we've seen how we can [authenticate using OmniAuth][omniauth] let's take a look at how we might use the credentials provided to make requests of a provider on behalf of a user.

The credentials stored in an `Authorization` can be used to make OAuth requests.

See how I can make a twitter_client attribute of user? This can be used to interact with the [twitter][twitter-client] API.

```ruby
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable
  
  attr_accessible :email, :name, :password, :password_confirmation, :remember_me
  
  has_many :authorizations, :dependent => :destroy
  
  has_many :tweets
  
  def twitter_client
    twitter_auth = authorizations.where(provider: "Twitter").first
    return [] unless twitter_auth
    Twitter::Client.new(
      :oauth_token => twitter_auth.token,
      :oauth_token_secret => twitter_auth.secret
    )
  end
end
```

This allows us access to a variety of twitter resources. lets pull the timeline of the `current_user`.
```html
<%= current_user.twitter_client.home_timeline.first.to_json %>
```
[omniauth]: ./omniauth.md 
[twitter-client]: https://github.com/sferik/twitter