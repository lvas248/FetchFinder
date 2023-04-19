require 'pry'
require 'geocoder'
# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create(name: 'Luke', movie: movies.first)


# response = HTTParty.get("https://data.cityofnewyork.us/resource/hxx3-bwgv.json")

# if response.code == 200
#     park_data = JSON.parse(response.body)
#     # binding.pry

#     def borough(string)
#         case string

#         when 'M'
#             return 'Manhattan'
#         when 'B'
#             return 'Brooklyn'
#         when 'Q'
#             return 'Queens'
#         when 'X'
#             return 'Bronx'
#         else
#             return 'Staten Island'
#         end
#     end

#     park_data.map do |p|
#         # binding.pry
#         results = Geocoder.search([p['the_geom']['coordinates'][0][0][0][1], p['the_geom']['coordinates'][0][0][0][0]])
#         puts results
#         Park.create({
#             name: p['name'],
#             borough: borough(p['borough']),
#             zip: p['zipcode'],
#             lat: p['the_geom']['coordinates'][0][0][0][1],
#             long: p['the_geom']['coordinates'][0][0][0][0],
#             address: results.first.address
#         }) 
        
    
#     end

# end

# # results = Geocoder.search([40.70932680472401,-74.0016459156729])

# # binding.pry
# # if results
# #     puts results.first.address
# #   else
# #     puts "No results found"
# # end