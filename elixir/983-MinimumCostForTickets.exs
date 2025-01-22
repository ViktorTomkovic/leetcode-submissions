defmodule Solution do
  @spec mincost_tickets(days :: [integer], costs :: [integer]) :: integer
  def mincost_tickets(days, costs) do
    lastDay = List.last(days)
    daysSet = MapSet.new(days)
    elem(dfs(1, lastDay, daysSet, costs, Map.new()), 0)
    # dfs(1, lastDay, daysSet, costs, Map.new())
  end

  def dfs(day, lastDay, daysSet, costs, memo) do
    cond do
      day > lastDay ->
        {0, memo}

      !MapSet.member?(daysSet, day) ->
        {result, memo} = dfs(day + 1, lastDay, daysSet, costs, memo)
        {result, memo}

      Map.has_key?(memo, day) ->
        {Map.get(memo, day), memo}

      true ->
        [oneDay, sevenDays, thirtyDays] = costs
        {result1, memo1} = dfs(day + 1, lastDay, daysSet, costs, memo)
        memo2 = Map.merge(memo, memo1)
        {result7, memo7} = dfs(day + 7, lastDay, daysSet, costs, memo2)
        memo2 = Map.merge(memo2, memo7)
        {result3, memo3} = dfs(day + 30, lastDay, daysSet, costs, memo2)
        memo2 = Map.merge(memo2, memo3)
        result2 = min(result1 + oneDay, min(result7 + sevenDays, result3 + thirtyDays))
        memo2 = Map.put(memo2, day, result2)
        {result2, memo2}
    end
  end
end

days = [1, 4, 6, 7, 8, 20]
costs = [2, 7, 15]
# Output: 11
IO.inspect(Solution.mincost_tickets(days, costs))

days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31]
costs = [2, 7, 15]
# Output: 17
IO.inspect(Solution.mincost_tickets(days, costs))
