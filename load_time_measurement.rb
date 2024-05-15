require 'benchmark'
time = Benchmark.measure do
  require 'jekyll'
end
puts "Tiempo de carga: #{time.real} segundos"