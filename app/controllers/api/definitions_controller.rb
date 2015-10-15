class Api::DefinitionsController < ApplicationController

  # GET request for /api/definitions
  # Get all definitions
  def index
    definitions = Definition.all
    render json: definitions
  end

  def create
    definition = Definition.new(definition_params)
    definition.author_id = current_user.id
    definition.save!
    render json: Definition.all
  end

  def update
    definition = Definition.find(params[:id])
    if definition
      definition.update(definition_params)
      render json: Definition.all
    end
  end

  def destroy
    definition = Definition.find(params[:id])
    if definition
      definition.destroy
      render json: Definition.all
    end
  end

  private

  def definition_params
    params.require(:post).permit(:word, :word_def)
  end
end
