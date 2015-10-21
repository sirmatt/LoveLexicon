class StaticPagesController < ApplicationController
  before_action :signed_in?, only: [:root]

  def root
    render :root
  end
end
