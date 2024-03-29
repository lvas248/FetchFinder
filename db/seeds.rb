require 'pry'
require 'geocoder'
require 'faker'


response = HTTParty.get("https://data.cityofnewyork.us/resource/hxx3-bwgv.json")

debugger 

if response.code == 200
    data = JSON.parse(response.body)  
    
    def borough(string)
        case string

        when 'M'
            return 'Manhattan'
        when 'B'
            return 'Brooklyn'
        when 'Q'
            return 'Queens'
        when 'X'
            return 'Bronx'
        else
            return 'Staten Island'
        end
    end

    data.map do |p|
        # binding.pry
        results = Geocoder.search([p['the_geom']['coordinates'][0][0][0][1], p['the_geom']['coordinates'][0][0][0][0]])
        puts results
        Park.create({
            name: p['name'],
            borough: borough(p['borough']),
            zip: p['zipcode'],
            address: results.first.address
        }) 
        
    
    end


  
    data.each do |p|
        park = Park.find_by_name(p['name'])
        park.update( geometry_type: p['the_geom']['type'], coordinates: p['the_geom']['coordinates'][0][0])
        long = 0
        lat = 0
        tot = 0
        park.coordinates.each do |y,x|
            long += y
            lat += x
            tot +=1
        end   

        park.update(central_coords: [lat/tot,long/tot])
        puts "#{lat/tot}, #{long/tot}"
    end

   
    
end



# 5.times do
#     User.create!(
#         username: Faker::Internet.unique.username,
#         password: '123',
#         password_confirmation: '123'
#     )
# end

# 100.times do 
#     Visit.create!(
#         user_id: User.all.sample.id,
#         park_id: Park.all.sample.id,
#         start_time: Faker::Time.between(from: DateTime.now, to: DateTime.now + Rational(1,1440)),
#         end_time: Faker::Time.between(from: DateTime.now + Rational(1,24), to: DateTime.now + Rational(2,24)),
#         duration: rand(3600..10800)
#     )
# end

# ^^This creates visits for random parks by random users  with start_time now


User.create(
    username: 'demo',
    password: 'password',
    password_confirmation: 'password'
)