# Definition for a binary tree node.

defmodule TreeNode do
  @type t :: %__MODULE__{
          val: integer,
          left: TreeNode.t() | nil,
          right: TreeNode.t() | nil
        }
  @derive JSON.Encoder
  defstruct val: 0, left: nil, right: nil
end

defmodule TreeNodeIndex do
  @type t :: %__MODULE__{
          val: integer,
          leftIndex: integer | nil,
          rightIndex: integer | nil
        }
  @derive JSON.Encoder
  defstruct val: 0, leftIndex: nil, rightIndex: nil
end

defmodule MathArithmetics do
  require Integer

  def ceilPower(number, power \\ 1, base \\ 2, currentExponent \\ 0) do
    if number < power do
      %{number: number, power: power, base: base, currentExponent: currentExponent}
    else
      ceilPower(number, power * base, base, currentExponent + 1)
    end
  end

  @spec makeIndeces(number :: integer(), base :: integer(), currentExponent :: integer()) ::
          list(integer())
  def makeIndeces(number, base \\ 2, currentExponent \\ 0) do
    # IO.inspect([number, base, currentExponent, base ** currentExponent])
    left = base ** currentExponent
    right = min(number, base ** (currentExponent + 1) - 1)

    cond do
      currentExponent == 0 ->
        [1 | makeIndeces(number, base, 1)]

      number < left ->
        []

      Integer.is_even(currentExponent) ->
        Enum.to_list(left..right//1) ++ makeIndeces(number, base, currentExponent + 1)

      Integer.is_odd(currentExponent) ->
        Enum.to_list(right..left//-1) ++ makeIndeces(number, base, currentExponent + 1)

      true ->
        raise "Shouldn't happen"
    end
  end
end

defmodule TreeTraversal do
  def infixTraverse(nil) do
    []
  end

  def infixTraverse(%{val: value, left: left, right: right}) do
    prefixTraverse(left) ++ [value] ++ prefixTraverse(right)
  end

  def prefixTraverse(nil) do
    []
  end

  def prefixTraverse(%{val: value, left: left, right: right}) do
    [value] ++ prefixTraverse(left) ++ prefixTraverse(right)
  end

  def postfixTraverse(nil) do
    []
  end

  def postfixTraverse(%{val: value, left: left, right: right}) do
    prefixTraverse(left) ++ prefixTraverse(right) ++ [value]
  end
end

defmodule Solution do
  require Integer
  @spec reverse_odd_levels(root :: TreeNode.t() | nil) :: TreeNode.t() | nil
  def reverse_odd_levels(root) do
  end

  def changeListToCorrectOrder(valueList) do
    nodes = Enum.map(valueList, fn value -> %TreeNode{val: value, left: nil, right: nil} end)
    nodes2 = Enum.zip(1..length(nodes), nodes)
    nodes3 = Map.new(nodes2)
    # IO.puts(nodes3 |> JSON.encode_to_iodata!())

    nodes4 =
      valueList
      |> Enum.map(fn value -> %TreeNode{val: value, left: nil, right: nil} end)
      |> Enum.zip(1..length(nodes))
      |> Map.new(fn {v, k} -> {k, v} end)

    # IO.puts(nodes4 |> JSON.encode_to_iodata!())
    IO.inspect(MathArithmetics.ceilPower(7))
    IO.inspect(MathArithmetics.makeIndeces(8))
    IO.inspect(MathArithmetics.makeIndeces(15))
    IO.inspect(MathArithmetics.makeIndeces(16))
  end

  def makeIndexTreeFromValueList(valueList) do
    nodes =
      valueList
      |> Enum.map(fn value -> %TreeNodeIndex{val: value, leftIndex: nil, rightIndex: nil} end)
      |> Enum.zip(1..length(valueList))
      |> Map.new(fn {v, k} -> {k, v} end)

    # IO.inspect(nodes)

    linkedNodes = Map.new()

    Enum.to_list(1..length(valueList))
    |> Enum.map(fn index ->
      thisNode = Map.get(nodes, index)
      parentIndex = Integer.floor_div(index, 2)
      parentNode = Map.get(nodes, parentIndex)
      IO.inspect(parentNode)

      newParent =
        cond do
          index == 1 ->
            thisNode

          Integer.is_even(index) ->
            %TreeNodeIndex{parentNode | leftIndex: index}

          Integer.is_odd(index) ->
            %TreeNodeIndex{parentNode | rightIndex: index}
        end

      IO.inspect(newParent)
      Map.put(linkedNodes, parentIndex, newParent)
    end)

    linkedNodes =
      Enum.reduce(Enum.to_list(1..length(valueList)), Map.new(), fn index, acc ->
        thisNode = Map.get(nodes, index)
        parentIndex = Integer.floor_div(index, 2)
        parentNode = Map.get(nodes, parentIndex)
        accNode = Map.get(acc, parentIndex)

        parentNode =
          if accNode != nil do
            %{parentNode | leftIndex: accNode.leftIndex}
          else
            parentNode
          end

        IO.inspect(parentNode)
        IO.inspect(accNode)

        newParent =
          cond do
            index == 1 ->
              thisNode

            Integer.is_even(index) ->
              %TreeNodeIndex{parentNode | leftIndex: index}

            Integer.is_odd(index) ->
              %TreeNodeIndex{parentNode | rightIndex: index}
          end

        IO.inspect(newParent)
        Map.put(acc, parentIndex, newParent)
      end)

    linkedNodes = Map.delete(linkedNodes, 0)
    # IO.inspect(linkedNodes)
    # IO.inspect(nodes)

    linkedNodes2 =
      Enum.reduce(Map.keys(nodes), linkedNodes, fn key, acc ->
        if Map.has_key?(acc, key) do
          acc
        else
          node = Map.get(nodes, key)
          Map.put(acc, key, node)
        end
      end)

    # IO.inspect(linkedNodes2)
  end

  def makeTreeFromValueList(valueList) do
  end

  def prefixTraverseInspect(treenode) do
    result = TreeTraversal.prefixTraverse(treenode)
    IO.inspect(result)
    IO.inspect(TreeTraversal.postfixTraverse(treenode))
    IO.inspect(TreeTraversal.infixTraverse(treenode))
  end

  def generateInput() do
    input = %TreeNode{
      val: 2,
      left: %TreeNode{
        val: 3,
        left: %TreeNode{val: 8, left: nil, right: nil},
        right: %TreeNode{val: 13, left: nil, right: nil}
      },
      right: %TreeNode{
        val: 5,
        left: %TreeNode{val: 21, left: nil, right: nil},
        right: %TreeNode{val: 34, left: nil, right: nil}
      }
    }
  end
end

# Input: root = [2,3,5,8,13,21,34]
# Output: [2,5,3,8,13,21,34]
# Solution.reverse_odd_levels([2, 3, 5, 8, 13, 21, 34])
# Solution.changeListToCorrectOrder([2, 3, 5, 8, 13, 21, 34])
Solution.makeTreeFromValueList([2, 3, 5, 8, 13, 21, 34])

# Solution.prefixTraverseInspect(Solution.generateInput())
