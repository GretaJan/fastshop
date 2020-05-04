<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'subcategory_id' => $this->subcategory_id,
            'name' => $this->name,
            'energy' => $this->energy,
            'fat' => $this->fat,
            'saturated' => $this->saturated,
            'carbs' => $this->carbs,
            'sugar' => $this->sugar,
            'fiber' => $this->fiber,
            'protein' => $this->protein,
            'salt' => $this->salt,
            'vitamins' => $this->vitamins,
            'background_color' => $this->background_color,
            'image' => $this->image,
        ];
    }
}
