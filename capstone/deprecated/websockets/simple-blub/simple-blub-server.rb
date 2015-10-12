require 'em-websocket'
require 'json'

ALL_CLIENTS = {}

EM.run do
  EM::WebSocket.run(:host => "localhost", :port => 8080) do |ws|
    ws.onclose { ALL_CLIENTS.delete(ws) }
    ws.onerror { ALL_CLIENTS.delete(ws) }

    ws.onmessage do |msg|
      puts ALL_CLIENTS.count
      ALL_CLIENTS[ws] = JSON.parse(msg)

      ALL_CLIENTS.keys.each do |ws2|
        next if ws2 == ws

        ws2.send (ALL_CLIENTS.reject { |ws3| ws3 == ws2 }).values.to_json
      end
    end
  end
end
